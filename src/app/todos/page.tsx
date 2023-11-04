import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) return redirect('/sign-in?callbackUrl="/todos"')

  return <div>Hello, {session.user?.email ?? "No email"}</div>
}
