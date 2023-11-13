// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { Role } from "@prisma/client"
import { Session, DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: { userId: string; role: Role | null } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role: Role | null
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string
    role: Role | null
  }
}
