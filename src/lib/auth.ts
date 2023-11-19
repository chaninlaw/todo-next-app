import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Github from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import prisma from "@/lib/db"
import { compare } from "@/lib/utils"

export const authOptions: NextAuthOptions = {
  adapter: {
    ...PrismaAdapter(prisma),
    linkAccount: async (data) => {
      // custom token transformation
      delete data.refresh_token_expires_in
      // console.log("----------------linkAccount----------------", { data })
      try {
        await prisma.account.create({ data })
      } catch (error) {
        console.error("Error creating account:", error)
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      // profile(profile, tokens) {
      //   console.log("----------Profile Github----------:", { profile, tokens })
      //   return {
      //     id: profile.id.toString(),
      //     name: profile.name,
      //     email: profile.email,
      //     image: profile.avatar_url,
      //     role: profile?.role ?? "USER",
      //   }
      // },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("Invalid input")
        if (!credentials.email || !credentials.password)
          throw new Error("Please provide both your email and password")

        try {
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
            throw new Error("Login failed. Please, try again")
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
          throw error
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      // console.log("----------Sign In----------:", {
      //   user,
      //   account,
      //   profile,
      //   email,
      //   credentials,
      // })
      return true
    },
    redirect: async ({ url, baseUrl }) => {
      // console.log("----------Redirect Callback----------", { url, baseUrl })
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    jwt: async ({ token, user }) => {
      // console.log("----------JWT Callback----------", { token, user })
      if (user) {
        token.userId = user.id
        token.role = user.role
      }

      return token
    },
    session: async ({ session, token, user }) => {
      // console.log("----------Session Callback----------", { session, token })
      if (session.user) {
        session.user.userId = token.userId
        session.user.role = token.role
      }

      return session
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/error",
    verifyRequest: "/login",
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
  // events: {
  //   async signIn(message) {
  //     // console.log("-----------on successful sign in----------", message)
  //   },
  //   async signOut(message) {
  //     // console.log("-----------on signout----------", message)
  //   },
  //   async createUser(message) {
  //     // console.log("-----------user created----------", message)
  //   },
  //   async updateUser(message) {
  //     // console.log("-----------user updated----------", message)
  //   },
  //   async linkAccount(message) {
  //     // console.log("-----------accountn----------", message)
  //   },
  //   async session(message) {
  //     // console.log("-----------session is active----------", message)
  //   },
  // },
}
