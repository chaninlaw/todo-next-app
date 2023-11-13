"use client"

import { Switch } from "@nextui-org/react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import React from "react"

export default function SwitchTheme() {
  const { setTheme, theme } = useTheme()
  return (
    <Switch
      defaultSelected
      size="md"
      color="secondary"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <MoonIcon className={className} />
        ) : (
          <SunIcon className={className} />
        )
      }
    ></Switch>
  )
}
