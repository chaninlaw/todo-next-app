"use client"

import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react"

export default function SignInButton() {
  const { status } = useSession()
  if (status === "loading") return null
  else return <Button onClick={() => signIn()}>Sign In</Button>
}
