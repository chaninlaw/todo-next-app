import "../styles/globals.css"
import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import Providers from "@/components/global/providers"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route"

export const fontSans = FontSans({
  subsets: ["latin"],
  preload: true,
})

export const metadata: Metadata = {
  title: {
    template: "%s | Todos App",
    default: "Todos App | Ultimate Task Management Solution",
  },
  description: "Ultimate Task Management Solution",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.className
        )}
      >
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}
