import type { Metadata } from "next"
import { AppSideBar } from "@/components/app-sidebar"
import { AppMenu } from "@/components/app-menu"

export const metadata: Metadata = {
  title: "Todos App",
  description: "Ultimate Task Management App",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppMenu />
      <div className="border-t">
        <div className="bg-background">
          <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
            <AppSideBar />
            <div className="col-span-2 lg:col-span-8 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <main className="relative w-full min-h-screen">{children}</main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
