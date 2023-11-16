import Link from "next/link"
import NavMenu from "@/components/landing/nav-menu"
import SignInButton from "@/components/landing/signin-button"
import { cn } from "@/lib/utils"
import { getCurrentUser } from "@/lib/session"

export default async function LandingPageMenu({
  className,
}: {
  className?: string
}) {
  const user = await getCurrentUser()

  return (
    <header
      className={cn(
        "h-16 bg-accent flex justify-between items-center rounded-md border border-zinc-500 p-4 m-2 md:m-4",
        className
      )}
    >
      <Link
        href="/"
        className="relative z-20 flex text-primary items-center text-lg font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        <strong>Todos</strong>
      </Link>
      <div className="flex">
        <NavMenu />
        <SignInButton user={user} />
      </div>
    </header>
  )
}
