import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/session"
import { signIn } from "next-auth/react"

export default async function SignInButton() {
  const user = await getCurrentUser()

  if (user) return null

  return <Button onClick={() => signIn()}>Sign In</Button>
}
