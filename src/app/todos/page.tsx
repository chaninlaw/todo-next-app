import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) return redirect('/sign-in?callbackUrl="/todos"')

  return <div>Hello, {session.user?.email ?? "No email"}</div>
}
