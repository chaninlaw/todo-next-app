"use client"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Command } from "lucide-react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import SwitchTheme from "@/components/global/switch-theme"

export function AppMenu() {
  const { push } = useRouter()

  return (
    <div className="flex justify-between">
      <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
        <MenubarMenu>
          <MenubarTrigger className="font-bold">
            <Command className="mr-1 md:mr-2" size={16} />
            Todos
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => push("/")}>Home</MenubarItem>
            <MenubarItem onClick={() => push("/about")} disabled>
              About
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => push("/preferences")} disabled>
              Preferences <MenubarShortcut>⌘,</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarShortcut />
            <MenubarItem
              onClick={() => signOut({ redirect: true, callbackUrl: "/todo" })}
            >
              Quit <MenubarShortcut>⌘Q</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <SwitchTheme />
    </div>
  )
}
