import TodoTable from "@/components/dashboard/todo-table"
import { TodosTableSkeleton } from "@/components/global/skeletons"
import { Separator } from "@/components/ui/separator"
import { getTodoByUser } from "@/lib/actions/todos"
import { getCurrentUser } from "@/lib/session"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function Page() {
  const user = await getCurrentUser()
  if (!user) return redirect('/signIn?callbackUrl="/todo"')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">To-Do</h1>
      <Separator />
      <div>
        <Suspense fallback={<TodosTableSkeleton />}>
          <TodoTable userId={user.userId} />
        </Suspense>
      </div>
    </div>
  )
}
