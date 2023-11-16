import { Status } from "@prisma/client"
import { z } from "zod"

export type State = {
  errors?: {
    customerId?: string[]
    amount?: string[]
    status?: string[]
  }
  message?: string | null
}

export const CreateTodoSchema = z.object({
  title: z.string({
    invalid_type_error: "Please enter todo title.",
    required_error: "Please enter todo title.",
  }),
  description: z.string().optional(),
  dueDate: z
    .date({ invalid_type_error: "Data type of Due date is error." })
    .optional(),
  status: z.nativeEnum(Status),
  userId: z.string({
    required_error: "User id doesn't found.",
  }),
})

export const UpdateTodoSchema = z.object({
  id: z.string({ required_error: "Todo id is required" }),
  title: z.string({
    invalid_type_error: "Please enter todo title.",
    required_error: "Please enter todo title.",
  }),
  description: z.string().optional(),
  dueDate: z
    .date({ invalid_type_error: "Data type of Due date is error." })
    .optional(),
  status: z.nativeEnum(Status),
  userId: z.string({ required_error: "User id doesn't found." }),
})

export const DeleteTodoSchema = z.object({
  todoId: z.string({ required_error: "Todo id is required" }),
})
