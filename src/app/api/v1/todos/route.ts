import {
  getFail,
  getSuccess,
  postFail,
  postSuccess,
  serverError,
} from "@/lib/api"
import prisma from "@/lib/db"
import { Todo } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(req: NextRequest) {
  const { nextUrl } = req

  console.log({ nextUrl })

  const page = nextUrl.searchParams.get("page")
  const limit = nextUrl.searchParams.get("limit")

  try {
    const data = await prisma.todo.findMany({
      skip: page ? parseInt(page as string, 10) : undefined,
      take: limit ? parseInt(limit as string, 10) : undefined,
    })
    if (data) {
      return getSuccess(data)
    } else {
      return getFail("Todo not found")
    }
  } catch (error) {
    return serverError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const { text }: Todo = await req.json()
    const session = await getServerSession(authOptions)

    if (!session) {
      return postFail("UNAUTHORIZED")
    }
    if (!text) {
      return postFail("Text is required")
    }

    const data = await prisma.todo.create({
      data: { text, userId: session.user.userId },
    })

    return postSuccess(data)
  } catch (error) {
    return serverError(error)
  }
}
