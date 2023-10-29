import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { signOut } from "next-auth/react"
import NavMenu from "@/components/NavMenu"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="">
      <NavMenu />
      <h1 className="text-9xl">Home</h1>
      <h2>getServerSession result:</h2>
      <>{session?.user ? session.user.role : "Not Logged In"}</>
      <br />
      <>{JSON.stringify(session)}</>
    </div>
  )
}
