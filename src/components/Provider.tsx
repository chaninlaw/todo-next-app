"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { PropsWithChildren, useState } from "react"

export default function Provider({
  session,
  children,
}: PropsWithChildren<{ session: Session | null }>) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  )
}
