import { nameToColor, isColorLight, cn } from "@/lib/utils"
import { getCurrentUser } from "@/lib/session"
import { Avatar } from "@nextui-org/react"

interface Props {
  className?: string
}

export default async function UserAvatar({ className }: Props) {
  const user = await getCurrentUser()

  if (!user) return <></>

  let userName = ""
  if (!user?.name) {
    userName = "U K"
  } else {
    userName = user.name
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
      src={user?.image ?? undefined}
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
