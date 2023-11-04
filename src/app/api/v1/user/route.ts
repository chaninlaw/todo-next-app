import { hash } from "@/app/lib/utils"
import prisma from "@/server/db"
import { User } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const session = getServerSession()
  const { email, password }: Partial<User> = await req.json()

  if (!session) new NextResponse(null, { status: 401 })

  if (!email || !password) {
    return new NextResponse(
      JSON.stringify({ message: "Email or password has required!" }),
      { status: 404 }
    )
  }

  const hasUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (hasUser)
    return new NextResponse(
      JSON.stringify({ message: "This email already exist!" }),
      { status: 401 }
    )

  const user = await prisma.user.create({
    data: {
      email,
      password: hash(password),
      role: "USER",
      name: email,
    },
  })

  return new NextResponse(JSON.stringify({}), { status: 201 })
}
