import { sortingTodo } from "@/components/dashboard/todo-table.config"
import { TodoWithUser } from "@/lib/interface"
import { SortDescriptor } from "@nextui-org/react"

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
