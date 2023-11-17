import { Button } from "@/components/ui/button"
import { Session } from "next-auth"
import { signIn } from "next-auth/react"

export default function SignInButton({
  user,
}: {
  user: Session["user"] | undefined | null
}) {
  if (user) return null
  else return <Button onClick={() => signIn()}>Sign In</Button>
}
