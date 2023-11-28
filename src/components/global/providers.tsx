"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { PropsWithChildren } from "react"
import { TailwindIndicator } from "@/components/global/tailwind-indicator"
import { Toaster } from "@/components/ui/toaster"
import { NextUIProvider } from "@nextui-org/react"

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
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
