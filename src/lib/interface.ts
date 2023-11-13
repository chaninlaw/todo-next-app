import { Todo, User } from "@prisma/client"

export type TodoWithUser = Todo & { user: User | null }
