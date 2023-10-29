// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { Role } from "@prisma/client"
import { Session, DefaultSession } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
      id?: string | null
      role?: Role | null
    } & DefaultSession
  }

  interface User extends DefaultUser {
    role: Role
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    role: Role
  }
}
