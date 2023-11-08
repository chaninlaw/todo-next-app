"use client"

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"

export default function SignOutDropDown() {
  const handleSignOut = () => signOut({ redirect: true, callbackUrl: "/" })
  return (
    <DropdownMenuItem onClick={handleSignOut}>
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}
