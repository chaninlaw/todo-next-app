"use client"

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] flex items-center justify-center"
        shadow="sm"
      >
        <CardHeader className="flex items-center justify-center">
          <h1 className="text-center text-xl">Something went wrong!</h1>
        </CardHeader>
        <CardBody className="flex items-center justify-center">
          {error.message}
        </CardBody>
        <CardFooter className="flex items-center justify-center">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the invoices route
              () => reset()
            }
          >
            Try again
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
