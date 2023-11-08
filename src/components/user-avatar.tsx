"use client"

import { nameToColor, isColorLight, cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"

interface Props {
  className?: string
}

export default function UserAvatar({ className }: Props) {
  const { data: session } = useSession()

  if (!session) return <></>

  const { user } = session

  let userName = ""
  if (!user?.name) {
    userName = "N A"
  } else {
    userName = user.name
  }
  const [first, last] = userName.split(" ")
  const userColor = nameToColor(userName)
  const isLightColor = isColorLight(userColor)

  return (
    <Avatar className="border border-foreground">
      <AvatarImage className={className} src={user?.image ?? undefined} />
      <AvatarFallback
        className={cn({
          "text-white": true,
          "text-zinc-900": isLightColor,
          className,
        })}
        style={{
          backgroundColor: userColor,
        }}
      >
        {first && last
          ? first.charAt(0).toUpperCase() + last.charAt(0).toUpperCase()
          : first.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
