import { CircularProgress } from "@nextui-org/react"
import React from "react"

interface Props {}

export default function loading({}: Props) {
  return (
    <main className="min-h-screen w-full bg-content grid place-items-center">
      <CircularProgress label="Loading..." />
    </main>
  )
}
