import "../../style/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Provider from "@/components/Provider"
import { getServerSession } from "next-auth"
import { Toaster } from "@/components/ui/toaster"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { Sidebar } from "@/components/SideBar"
import { HeadMenu } from "@/components/HeadMenu"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Todo App",
  description: "Ultimate Task Management Solution",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <HeadMenu />
          <div className="border-t">
            <div className="bg-background">
              <div className="grid lg:grid-cols-5">
                <Sidebar />
                <div className="col-span-3 lg:col-span-4 lg:border-l">
                  <div className="h-full px-4 py-6 lg:px-8">
                    <main className="relative w-full min-h-screen">
                      {children}
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
