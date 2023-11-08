import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}
