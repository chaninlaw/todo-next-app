import Link from "next/link"
import UserMenu from "@/components/landing/user-menu"
import SignInButton from "@/components/landing/signin-button"
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import { CommandIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route"

export default async function LandingPageMenu() {
  const session = await getServerSession(authOptions)

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <Link href="/">
          <NavbarBrand className="mr-4 space-x-2">
            <CommandIcon />
            <p className="font-bold text-inherit">Todos</p>
          </NavbarBrand>
        </Link>
        <NavbarContent justify="end" className="flex gap-3">
          <UserMenu />
          <SignInButton user={session?.user} />
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  )
}
