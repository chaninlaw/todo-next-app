import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import { compare } from "@/app/lib/utils"

const prisma = new PrismaClient()
const adapter = PrismaAdapter(prisma)

export const authOptions: NextAuthOptions = {
  adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      profile(profile, tokens) {
        console.log("----------Profile Github----------:", { profile, tokens })
        return {
          ...profile,
          role: "USER",
        }
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Please provide both your email and password")

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (
          user &&
          user.password !== null &&
          compare(credentials.password, user.password)
        ) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      console.log("----------Sign In----------:", {
        user,
        account,
        profile,
        email,
        credentials,
      })
      return true
    },
    redirect: async ({ url, baseUrl }) => {
      console.log("----------Redirect Callback----------", { url, baseUrl })
      return baseUrl
    },
    jwt: async ({ token, user }) => {
      console.log("----------JWT Callback----------", { token, user })
      if (user) {
        token.userId = user.id
        token.role = user.role
      }

      return token
    },
    session: ({ session, token }) => {
      console.log("----------Session Callback----------", { session, token })
      if (session.user && token) {
        session.user.userId = token.userId
        session.user.role = token.role
      }

      return session
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
    // error: "/error",
    // verifyRequest: "/login",
  },
  debug: process.env.NODE_ENV !== "production",
  logger: {
    error(code, metadata) {
      console.error(code, metadata)
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      console.debug(code, metadata)
    },
  },
  events: {
    async signIn(message) {
      console.log("-----------on successful sign in----------", message)
    },
    async signOut(message) {
      console.log("-----------on signout----------", message)
    },
    async createUser(message) {
      console.log("-----------user created----------", message)
    },
    async updateUser(message) {
      console.log("-----------user updated----------", message)
    },
    async linkAccount(message) {
      console.log("-----------accountn----------", message)
    },
    async session(message) {
      console.log("-----------session is active----------", message)
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
