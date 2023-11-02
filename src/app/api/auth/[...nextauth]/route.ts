import NextAuth from "next-auth/next"
import GithubProvider, { GithubProfile } from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { Prisma, PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions, getServerSession } from "next-auth"
import { compare } from "@/lib/utils"
import { Adapter } from "next-auth/adapters"
import { randomBytes, randomUUID } from "crypto"
// import { PrismaAdapter } from "@auth/prisma-adapter"
import Cookies from "cookies"
import { encode, decode } from "next-auth/jwt"

const prisma = new PrismaClient()
const adapter = PrismaAdapter(prisma)

const CustomPrismaAdapter = (p: typeof prisma): Adapter => {
  return {
    ...PrismaAdapter(p),
    createUser: async (data) =>
      (await p.user.create({
        data: {
          email: data.email,
          emailVerified: data.emailVerified,
          image: data.image,
          role: data.role,
          name: data.name,
        },
      })) as unknown as any,
    getUser: async (id) =>
      (await p.user.findUnique({ where: { id } })) as unknown as any,
    getUserByEmail: async (email) =>
      (await p.user.findUnique({ where: { email } })) as unknown as any,
    async getUserByAccount(provider_providerAccountId) {
      const account = await p.account.findUnique({
        where: { provider_providerAccountId },
        select: { user: true },
      })
      return (account?.user ?? null) as unknown as any
    },
    updateUser: async (data) =>
      (await p.user.update({ where: { id: data.id }, data })) as unknown as any,
    deleteUser: async (id) =>
      (await p.user.delete({ where: { id } })) as unknown as any,
    linkAccount: async (data) => {
      return (await p.account.create({
        data: {
          id_token: data.id_token,
          session_state: data.session_state,
          access_token: data.access_token,
          expires_at: data.expires_at,
          provider: data.provider,
          providerAccountId: data.providerAccountId,
          refresh_token: data.refresh_token,
          scope: data.scope,
          token_type: data.token_type,
          type: data.type,
          userId: data.userId,
        },
      })) as unknown as any
    },
    unlinkAccount: async (provider_providerAccountId) =>
      (await p.account.delete({
        where: { provider_providerAccountId },
      })) as unknown as any,
    getSessionAndUser: async (sessionToken) => {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      })

      console.log("userAndSession", userAndSession)
      if (!userAndSession) return undefined
      const { user, ...session } = userAndSession
      return { user, session } as unknown as any
    },
    createSession: async (data) => await p.session.create({ data }),
    updateSession: async (data) =>
      await p.session.update({
        data,
        where: { sessionToken: data.sessionToken },
      }),
    deleteSession: async (sessionToken) =>
      await p.session.delete({ where: { sessionToken } }),
    createVerificationToken: async (data) =>
      await p.verificationToken.create({ data }),
    async useVerificationToken(identifier_token) {
      try {
        return await p.verificationToken.delete({ where: { identifier_token } })
      } catch (error) {
        // If token already used/deleted, just return null
        // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
        if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
          return null
        throw error
      }
    },
  }
}

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "database",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    },
  },
  providers: [
    GithubProvider({
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
        if (!credentials?.email || !credentials?.password)
          throw new Error("Please provide both your email and password")

        // const { email, password } = credentials
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        // session and cookie
        if (
          user &&
          user.password !== null &&
          compare(credentials.password, user.password)
        ) {
          if (
            req.query &&
            req.query.nextauth?.includes("callback") &&
            req.query.nextauth?.includes("credentials") &&
            req.method === "POST"
          ) {
            if (user && "id" in user) {
              const sessionToken = randomUUID()
              const sessionExpiry = new Date(Date.now() + session.maxAge * 1000)
              await adapter.createSession({
                sessionToken: sessionToken,
                userId: user.id,
                user: {
                  name: user.name,
                  email: user.email,
                },
                expires: sessionExpiry,
                // userAgent: req.headers["user-agent"] ?? null,
              })
              const cookies = new Cookies(req, res)
              cookies.set("next-auth.session-token", sessionToken, {
                expires: sessionExpiry,
              })
            }
          }
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      console.log("SIGN-IN:", { user, account, profile, email, credentials })
      return true
    },
    redirect: async ({ url, baseUrl }) => {
      return baseUrl
    },
    jwt: async ({ token, user }) => {
      // console.log("JWT Callback", { token, user })
      // pass in user's id and role to token
      if (user) {
        return {
          ...token,
          userId: user.id,
          role: user.role,
        }
        // token.userId = user.id
        // token.role = user.role
      }

      return token
    },
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token })
      if (session.user) {
        // session.userId = token.userId
        // session.role = token.role

        return {
          ...session,
          userId: token.userId,
          role: token.role,
        }
      }

      return session
    },
  },
  pages: {
    signIn: "/login",
    // newUser: "/register",
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
      /* on successful sign in */
      console.log("on successful sign in", message)
    },
    async signOut(message) {
      /* on signout */
      console.log("on signout", message)
    },
    async createUser(message) {
      /* user created */
      console.log("user created", message)
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
      console.log("user updated", message)
    },
    async linkAccount(message) {
      /* account (e.g. Twitter) linked to a user */
      console.log("accountn", message)
    },
    async session(message) {
      /* session is active */
      console.log("session is active", message)
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
