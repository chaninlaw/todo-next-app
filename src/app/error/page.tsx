"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { push } = useRouter()
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-center text-xl">Something went wrong!</h1>
      <Button
        className="mt-8"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => push("/")
        }
      >
        Back
      </Button>
    </main>
  )
}
