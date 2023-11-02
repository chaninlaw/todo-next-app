"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"

export default function NavMenu() {
  return (
    <div>
      <AuthButton />
    </div>
  )
}

function AuthButton() {
  const { data: session } = useSession()

  const handleSignIn = () => {
    signIn()
  }

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: "/" })
  }

  if (session) {
    return (
      <>
        {session.user?.name} <br />
        {JSON.stringify(session)}
        <br />
        <Button onClick={handleSignOut}>Sign out</Button>
      </>
    )
  }

  return (
    <>
      Not signed in <br />
      <Button onClick={handleSignIn}>Sign in</Button>
    </>
  )
}
