"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { PropsWithChildren } from "react"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster } from "@/components/ui/toaster"
import { NextUIProvider } from "@nextui-org/react"

export default function Providers({
  session,
  children,
}: PropsWithChildren<{ session: Session | null }>) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  )
}
