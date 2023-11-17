import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions)
    return session?.user
  } catch (error) {
    console.error("Error fetching session:", error)
    return null
  }
}
