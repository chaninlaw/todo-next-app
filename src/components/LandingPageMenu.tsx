"use client"

import { signIn, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import Link from "next/link"
import NavMenu from "./NavMenu"

export default function LandingPageMenu() {
  const { data: session } = useSession()

  const handleSignIn = () => {
    signIn()
  }

  return (
    <header className="h-16 bg-zinc-50 flex justify-between items-center rounded-md border border-zinc-100 p-4 m-2 md:m-4">
      <Link
        href="/"
        className="relative z-20 flex items-center text-lg font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Todos
      </Link>
      <div className="flex">
        <NavMenu />
        {!session && <Button onClick={handleSignIn}>Sign In</Button>}
      </div>
    </header>
  )
}
