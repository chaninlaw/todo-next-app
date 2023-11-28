"use client"

import { nameToColor, isColorLight, cn } from "@/lib/utils"
import { Avatar } from "@nextui-org/react"
import { useSession } from "next-auth/react"

interface Props {
  className?: string
}

export default function UserAvatar({ className }: Props) {
  const { data: session, status } = useSession()

  if (status === "loading") return null

  let userName = ""
  if (!session?.user?.name) {
    userName = "U K"
  } else {
    userName = session.user.name
  }
  const [first, last] = userName.split(" ")
  const backgroundColor = nameToColor(userName)
  const isLightColor = isColorLight(backgroundColor)

  return (
    <Avatar
      isBordered
      className={`transition-transform`}
      style={{ backgroundColor }}
      color="success"
      src={session?.user?.image ?? undefined}
      fallback={
        <p
          className={cn("text-lg font-bold text-black hover:text-zinc-600", {
            "text-white": isLightColor,
          })}
        >
          {first && last
            ? first.charAt(0).toUpperCase() + last.charAt(0).toUpperCase()
            : first.charAt(0).toUpperCase()}
        </p>
      }
    />
  )
}
