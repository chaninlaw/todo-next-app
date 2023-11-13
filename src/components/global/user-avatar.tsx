import { nameToColor, isColorLight, cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCurrentUser } from "@/lib/session"

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
