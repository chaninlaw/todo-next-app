import { ChipProps, SortDescriptor } from "@nextui-org/react"
import { Todo } from "@prisma/client"
import { TodoWithUser } from "@/lib/interface"
import { CustomTodoColumns, StatusTodoOptions } from "./client-todo-table"

export const columnsTodo: CustomTodoColumns[] = [
  { value: "TITLE", key: "title", sortable: true },
  { value: "DESCRIPTION", key: "description", sortable: true },
  { value: "DUE DATE", key: "dueDate", sortable: true },
  { value: "TAGS", key: "tags" },
  { value: "STATUS", key: "status", sortable: true },
  { value: "UPDATE AT", key: "updatedAt", sortable: true },
  { value: "ACTIONS", key: "actions" },
]

export const statusTodoOptions: StatusTodoOptions<Todo["status"]>[] = [
  { value: "Active", key: "ACTIVE" },
  { value: "Completed", key: "COMPLETED" },
  { value: "Block", key: "BLOCK" },
]

export const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
}

export const INITIAL_VISIBLE_COLUMNS = [
  "title",
  "description",
  "dueDate",
  "status",
  "updatedAt",
  "actions",
]

export const sortingTodo = (
  todos: TodoWithUser[],
  sortDescriptor: SortDescriptor
) => {
  return todos.sort((a: TodoWithUser, b: TodoWithUser) => {
    const column = sortDescriptor.column as keyof TodoWithUser
    const typeA = typeof a[column]
    const typeB = typeof b[column]

    const normalizeValue = (value: any) => {
      if (
        typeA === "string" &&
        typeB === "string" &&
        ["createdAt", "updatedAt", "dueDate"].includes(column)
      ) {
        return new Date(value)
      }

      if (typeA === "number" && typeB === "number") {
        return Number(value)
      }

      if (typeA === "string" && typeB === "string") {
        return value.toLowerCase()
      }

      return value
    }

    const normalizedA = normalizeValue(a[column])
    const normalizedB = normalizeValue(b[column])

    const cmp =
      normalizedA < normalizedB ? -1 : normalizedA > normalizedB ? 1 : 0

    return sortDescriptor.direction === "descending" ? -cmp : cmp
  })
}
