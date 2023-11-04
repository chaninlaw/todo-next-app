import {
  deleteSuccess,
  getFail,
  getSuccess,
  putFail,
  putSuccess,
  serverError,
} from "@/app/lib/api"
import prisma from "@/server/db"
import { Todo } from "@prisma/client"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const { json } = req
  const body = await json()
  const { id } = body

  try {
    const data = await prisma.todo.findUnique({ where: { id } })
    if (data) return getSuccess(data)
    else return getFail("Todo not found")
  } catch (error) {
    return serverError(error)
  }
}

export async function PUT(req: NextRequest) {
  const { json } = req
  const body = await json()
  const { id, text, done }: Todo = body

  try {
    if (!id) putFail("Id is required")
    if (!text && !done) putFail("Put method is required all data")
    const updatedTodo = await prisma.todo.updateMany({
      where: { id },
      data: { text, done },
    })
    return putSuccess(updatedTodo)
  } catch (error) {
    return serverError(error)
  }
}

export async function PATCH(req: NextRequest) {
  const { json } = req

  const body = await json()
  const { id, text, done }: Partial<Todo> = body

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { text, done },
    })
    return putSuccess(updatedTodo)
  } catch (error) {
    return serverError(error)
  }
}

export async function DELETE(req: NextRequest) {
  const { json } = req

  const body = await json()
  const { id } = body

  try {
    await prisma.todo.delete({ where: { id } })
    return deleteSuccess("Todo deleted")
  } catch (error) {
    return serverError(error)
  }
}
