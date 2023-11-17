"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader, Github } from "lucide-react"
import { register } from "@/lib/actions/authenticate"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { CredentialsSchema } from "@/lib/actions/authenticate/validation"
import { toastCatch } from "@/lib/toastCatch"

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string
  error?: string
  formType: "sign-up" | "sign-in"
}

export function AuthForm({
  className,
  callbackUrl,
  error,
  formType,
  ...props
}: LoginFormProps) {
  const { push } = useRouter()
  const [authLoading, setAuthLoading] = useState(false)
  const form = useForm<z.infer<typeof CredentialsSchema>>({
    resolver: zodResolver(CredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (credentials: z.infer<typeof CredentialsSchema>) => {
    if (formType === "sign-up") {
      await register(credentials).catch(toastCatch)
    } else if (formType === "sign-in") {
      await signIn("credentials", {
        ...credentials,
        redirect: false,
      })
        .then(() => push("/todo"))
        .catch(toastCatch)
    }
  }

  const handleGithubSignIn = async () => {
    setAuthLoading(true)
    await signIn("github", {
      redirect: false,
      callbackUrl: "/todo",
    }).catch((err) => {
      toastCatch(err)
      setAuthLoading(false)
    })
  }

  return (
    <div className={cn("grid gap-6 text-primary", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        aria-describedby="email-error"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="email-error" aria-live="polite" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        aria-describedby="password-error"
                        autoComplete={
                          formType === "sign-up"
                            ? "new-password"
                            : "current-password"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="password-error" aria-live="polite" />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              {formType === "sign-up" ? "Sign up" : "Log in with Email"}
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={handleGithubSignIn}
        disabled={form.formState.isSubmitting}
      >
        {authLoading ? (
          <Loader className="mr-4 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-4 h-4 w-4 outline outline-1 outline-offset-4 outline-foreground rounded-xl" />
        )}
        Github Account
      </Button>
    </div>
  )
}
