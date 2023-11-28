import Link from "next/link"
import UserMenu from "@/components/landing/user-menu"
import SignInButton from "@/components/landing/signin-button"
import { CommandIcon } from "lucide-react"
import { Navbar, NavbarContent, NavbarBrand } from "@nextui-org/react"

export default async function LandingPageMenu() {
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
          <SignInButton />
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  )
}
