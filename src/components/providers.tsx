"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { PropsWithChildren, useState } from "react"
import { Analytics } from "./analytics"
import { TailwindIndicator } from "./tailwind-indicator"
import { Toaster } from "./ui/toaster"

export default function Providers({
  session,
  children,
}: PropsWithChildren<{ session: Session | null }>) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
