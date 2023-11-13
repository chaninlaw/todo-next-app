import { sortingTodo } from "@/components/dashboard/todo-table.config"
import { TodoWithUser } from "@/lib/interface"
import { SortDescriptor } from "@nextui-org/react"
import { Status } from "@prisma/client"
import { z } from "zod"

export interface ActionTodo {
  type: "ADD" | "EDIT" | "DELETE"
  todo: TodoWithUser
}

export const actionTodo = (
  state: TodoWithUser[],
  action: ActionTodo,
  sortDescriptor: SortDescriptor
) => {
  switch (action.type) {
    case "ADD":
      return sortingTodo([...state, action.todo], sortDescriptor)
    case "EDIT":
      const updateTodo = state.map((todo) => {
        if (todo.id === action.todo.id) {
          return action.todo
        }
        return todo
      })
      return sortingTodo(updateTodo, sortDescriptor)
    case "DELETE":
      const excludeTodo = state.filter((todo) => todo.id !== action.todo.id)
      return sortingTodo(excludeTodo, sortDescriptor)

    default:
      return state
  }
}

export type State = {
  errors?: {
    customerId?: string[]
    amount?: string[]
    status?: string[]
  }
  message?: string | null
}

export const TodoSchema = z.object({
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
