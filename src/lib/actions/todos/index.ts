"use server"

import { z } from "zod"
import { User } from "@prisma/client"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import {
  UpdateTodoSchema,
  DeleteTodoSchema,
  CreateTodoSchema,
} from "./validations"

export const getTodoByUser = async (userId: User["id"]) => {
  try {
    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { status: "asc" },
      include: { user: true },
    })
    return todos
  } catch (error) {
    return new Error("Failed to fetch todos data.")
  }
}

export const createTodo = async (
  formData: z.infer<typeof CreateTodoSchema>
) => {
  const validatedFields = CreateTodoSchema.safeParse(formData)
  if (!validatedFields.success) {
    const message = "Missing Fields. Failed to create todo."
    const cause = validatedFields.error.flatten().fieldErrors
    return new Error(message, { cause })
  }

  try {
    const data = validatedFields.data
    await prisma.todo.create({ data })
  } catch (error) {
    if (error instanceof Error) {
      return new Error(error.message, { cause: error.cause })
    } else {
      console.log(error)
      return error
    }
  }

  revalidatePath("/todo")
}

export const updateTodo = async (
  formData: z.infer<typeof UpdateTodoSchema>
) => {
  const validatedFields = UpdateTodoSchema.safeParse(formData)

  if (!validatedFields.success) {
    const message = "Missing Fields. Failed to update todo."
    const cause = validatedFields.error.flatten().fieldErrors
    return new Error(message, { cause })
  }

  try {
    const { id, ...data } = validatedFields.data
    await prisma.todo.update({
      where: { id },
      data,
    })
  } catch (error) {
    if (error instanceof Error) {
      return new Error(error.message, { cause: error.cause })
    } else {
      return error
    }
  }

  revalidatePath("/todo")
}

export const deleteTodo = async (
  formData: z.infer<typeof DeleteTodoSchema>
) => {
  const validatedFields = DeleteTodoSchema.safeParse(formData)

  if (!validatedFields.success) {
    const message = "Todo id is missing."
    const cause = validatedFields.error.flatten().fieldErrors
    return new Error(message, { cause })
  }

  try {
    const { todoId } = validatedFields.data
    await prisma.todo.delete({
      where: { id: todoId },
    })
  } catch (error) {
    if (error instanceof Error) {
      return new Error(error.message, { cause: error.cause })
    } else {
      return error
    }
  }

  revalidatePath("/todo")
}
