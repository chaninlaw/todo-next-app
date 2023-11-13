"use server"

import { User } from "@prisma/client"
import prisma from "@/lib/db"
import { ZodError, z } from "zod"
import { revalidatePath } from "next/cache"
import { UpdateTodoSchema, DeleteTodoSchema, TodoSchema } from "./validations"

export const getTodoByUser = async (userId: User["id"]) => {
  try {
    // REMOVE THIS IN PROD
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { status: "asc" },
      include: { user: true },
    })
    return todos
  } catch (error) {
    return { message: "Failed to fetch todos data." }
  }
}

export const createTodo = async (formData: z.infer<typeof TodoSchema>) => {
  const validatedFields = TodoSchema.safeParse(formData)

  if (!validatedFields.success) {
    throw {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create todo.",
    }
  }

  try {
    const data = validatedFields.data
    await prisma.todo.create({ data })
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        error: error.flatten().fieldErrors,
        message: "Database Error: Failed to create todo.",
      }
    } else {
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
    throw {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update todo.",
    }
  }

  try {
    const { id, ...data } = validatedFields.data
    await prisma.todo.update({
      where: { id },
      data,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        error: error.flatten().fieldErrors,
        message: "Database Error: Failed to update todo.",
      }
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
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Todo id is missing.",
    }
  }

  try {
    const { todoId } = validatedFields.data
    await prisma.todo.delete({
      where: { id: todoId },
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        error: error.flatten().fieldErrors,
        message: "Database Error: Failed to delete todo.",
      }
    } else {
      return error
    }
  }

  revalidatePath("/todo")
}
