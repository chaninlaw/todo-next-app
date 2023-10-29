import prisma from "@/server/db"
import { Todo } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page")
  const limit = req.nextUrl.searchParams.get("limit")

  const data = await prisma.todo.findMany({
    skip: page ? parseInt(page, 10) : undefined,
    take: limit ? parseInt(limit, 10) : undefined,
  })

  return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
  const session = getServerSession()
  const { text, userId }: Partial<Todo> = await req.json()

  if (!session) new NextResponse(null, { status: 401 })

  if (!text) return NextResponse.json({ message: "Todo text required" })

  const todo = await prisma.todo.create({
    data: {
      text,
      userId,
    },
  })

  return NextResponse.json({ data: todo })
}
