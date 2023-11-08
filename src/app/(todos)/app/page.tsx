import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Filter, Plus } from "lucide-react"
import { Metadata } from "next"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) return redirect('/sign-in?callbackUrl="/todos"')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">To-Do</h1>
      <Separator />
      <div className="flex space-x-2">
        <Button className="flex justify-center">
          <Plus size={21} className="mr-3" /> New Task
        </Button>
        <Button className="flex justify-center" variant="outline">
          <Filter size={17} className="mr-3" />
          Filters
        </Button>
      </div>
    </div>
  )
}
