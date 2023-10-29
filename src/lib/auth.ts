import prisma from "@/server/db"
import { hash } from "@/lib/utils"
import { User } from "next-auth"

type LoginFn = (username: string, password: string) => Promise<User>

export const login: LoginFn = async (username, password) => {
  const user = await prisma.user.findFirst({
    where: {
      email: username,
    },
  })
  if (user && hash(password) === user.password) {
    user.password = ""
    return user
  } else throw new Error("User Not Found!")
}
