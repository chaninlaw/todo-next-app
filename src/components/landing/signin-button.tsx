"use client"

import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/session"
import { signIn, useSession } from "next-auth/react"
import NavMenu from "./nav-menu"

export default function SignInButton() {
  const { data: session } = useSession()

  if (session) return null

  return <Button onClick={() => signIn()}>Sign In</Button>
}
