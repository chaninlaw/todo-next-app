import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
// import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { NextAuthOptions } from "next-auth"
import { GithubProfile } from "next-auth/providers/github"
import { hash } from "@/lib"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      profile(profile: GithubProfile) {
        console.log(profile)
        return {
          ...profile,
          role: profile.role ?? "USER",
          id: profile.id.toString(),
          image: profile.avatar_url,
        }
      },
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "john.doe@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email ?? "",
            password: credentials?.password ? hash(credentials.password) : "",
          },
        })

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token })
      if (session?.user) {
        return {
          expires: session.expires,
          user: {
            ...session.user,
            id: token.id,
            role: token.role,
          },
        }
      }
      return session
    },
    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user })
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        }
      }
      return token
    },
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
