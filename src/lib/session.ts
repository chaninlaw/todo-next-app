import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth"

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions)
    return session?.user
  } catch (error) {
    console.error("Error fetching session:", error)
    return null
  }
}
