import TodoTable from "@/components/dashboard/todo-table"
import { TodosTableSkeleton } from "@/components/global/skeletons"
import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">To-Do</h1>
      <Separator />
      <div>
        <Suspense fallback={<TodosTableSkeleton />}>
          <TodoTable />
        </Suspense>
      </div>
    </div>
  )
}
