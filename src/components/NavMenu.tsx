"use client"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { redirect } from "next/navigation"

interface Props {}

export default function NavMenu({}: Props) {
  return (
    <div>
      <AuthButton />
    </div>
  )
}

function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        {session?.user?.name} <br />
        <Button
          onClick={() => signOut({ redirect: true, callbackUrl: "/sign-in" })}
        >
          Sign out
        </Button>
      </>
    )
  }

  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  )
}
