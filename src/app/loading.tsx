import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-primary grid place-items-center">
      <div className="flex justify-center items-center text-accent">
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        <p>Loading...</p>
      </div>
    </div>
  )
}
