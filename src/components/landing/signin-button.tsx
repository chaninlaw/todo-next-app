"use client"

import { Button } from "@/components/ui/button"
import { Session } from "next-auth"
import { signIn } from "next-auth/react"

export default function SignInButton({
  user,
}: {
  user: Session["user"] | undefined
}) {
  if (user) return null

  return <Button onClick={() => signIn()}>Sign In</Button>
}
