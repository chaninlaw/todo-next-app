import { CircularProgress } from "@nextui-org/react"

export default function Loading() {
  return (
    <main className="min-h-screen w-full bg-content grid place-items-center">
      <CircularProgress label="Loading..." />
    </main>
  )
}
