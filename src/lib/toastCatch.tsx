"use client"

import { toast } from "@/components/ui/use-toast"
import { Toaster } from "./interface"
import { ToastAction } from "@/components/ui/toast"

export function toastCatch(error: unknown, callBack?: (cause?: any) => void) {
  const toaster: Toaster = (
    { description, title = "Error", variant = "destructive", ...rest },
    cause
  ) => {
    toast({
      title,
      description,
      variant,
      action: callBack ? (
        <ToastAction altText="Try again" onClick={() => callBack(cause)}>
          Try again
        </ToastAction>
      ) : undefined,
      ...rest,
    })
  }

  if (error instanceof Error) {
    if (error.cause) {
      toaster({ description: error.message }, error.cause)
    } else {
      toaster({ description: error.message })
    }
  } else {
    toaster({ description: "Something went wrong" })
  }
}
