import { columnsTodo, statusTodoOptions } from "./todo-table.config"
import ClientTodoTable from "./client-todo-table"
import { getTodoByUser } from "@/lib/actions/todos"
import { User } from "@prisma/client"
import { TodoWithUser } from "@/lib/interface"

export default async function TodoTable({ userId }: { userId: User["id"] }) {
  const todoWithUser = await getTodoByUser(userId)
  return (
    <ClientTodoTable
      todoWithUser={todoWithUser as TodoWithUser[]}
      columns={columnsTodo}
      statusOptions={statusTodoOptions}
    />
  )
}
