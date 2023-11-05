import { postFail, postSuccess, serverError } from "@/lib/api"
import { hash } from "@/lib/utils"
import prisma from "@/lib/db"
import { User } from "@prisma/client"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const { email, password }: Partial<User> = await req.json()
  try {
    if (!email || !password) {
      return postFail("Email and password has required!")
    }

    const hasUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!!hasUser) return postFail("This email already exist!")

    const user = await prisma.user.create({
      data: {
        email,
        password: hash(password),
        role: "USER",
        name: email,
      },
    })

    return postSuccess({})
  } catch (error) {
    return serverError(error)
  }
}
