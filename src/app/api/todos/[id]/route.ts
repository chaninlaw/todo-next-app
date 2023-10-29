import prisma from "@/server/db"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const data = await prisma.todo.findUnique({
    where: {
      id,
    },
  })

  return NextResponse.json({ data })
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const json = await req.json()

  const data = await prisma.todo.update({
    where: {
      id,
    },
    data: json,
  })

  return NextResponse.json({ data }).ok
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  await prisma.todo.delete({
    where: {
      id,
    },
  })

  return NextResponse.json({}).ok
}
