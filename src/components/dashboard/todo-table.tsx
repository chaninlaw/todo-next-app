import dynamic from "next/dynamic"
import { columnsTodo, statusTodoOptions } from "./todo-table.config"
import { getTodoByUser } from "@/lib/actions/todos"
import { TodoWithUser } from "@/lib/interface"
import { Session } from "next-auth"

const ClientTodoTable = dynamic(() => import("./client-todo-table"), {
  ssr: false,
})

export default async function TodoTable({ user }: { user: Session["user"] }) {
  const todoWithUser = await getTodoByUser(user.userId)

  return (
    <ClientTodoTable
      user={user}
      todoWithUser={todoWithUser as TodoWithUser[]}
      columns={columnsTodo}
      statusOptions={statusTodoOptions}
    />
  )
}
