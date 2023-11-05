import "@/styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getServerSession } from "next-auth"

import Providers from "@/components/providers"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

const inter = Inter({ subsets: ["latin"], variable: "---font-inter" })

export const metadata: Metadata = {
  title: "Todos App | Ultimate Task Management Solution",
  description: "Ultimate Task Management Solution",
  icons: {
    icon: "/favicon.ico",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background antialiased",
            inter.className
          )}
        >
          <Providers session={session}>
            <main>{children}</main>
          </Providers>
          <div className="fixed bottom-10 right-20">
            <ModeToggle />
          </div>
        </body>
      </html>
    </>
  )
}
