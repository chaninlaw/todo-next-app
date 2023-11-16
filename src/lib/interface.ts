import { Todo, User } from "@prisma/client"

export type TodoWithUser = Todo & { user: Partial<User> | null }

export type Toaster = (
  args: {
    description: string
    title?: string
    variant?: "default" | "destructive"
  },
  trigger?: Object
) => void
