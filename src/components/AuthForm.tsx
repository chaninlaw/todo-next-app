"use client"

import * as React from "react"
import * as z from "zod"

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
import { signIn } from "next-auth/react"
import axios from "axios"

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
  const formSchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(6).max(50),
    })
    .refine((data) => data, {
      message: "Your email and password invalid.",
      path: ["password"],
      params: ["error"],
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values
    setIsLoading(true)

    if (formType === "sign-up") {
      await axios
        .post("/api/user", { email, password })
        .then((res) => {
          if (res.status === 201) {
            signIn("credentials", {
              email,
              password,
              redirect: true,
              callbackUrl: "/todos",
            })
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false))
    } else {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: callbackUrl ?? "/todos",
      })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false))
    }
  }

  const handleGithubSignIn = () => {
    setIsLoading(true)
    signIn("github", { callbackUrl: "/todos", redirect: true })
      .then((response) => {
        console.log("response", { response })
        if (response?.error) {
          // show notification for user
        } else {
          // redirect to destination page
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
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
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                        autoComplete={
                          formType === "sign-up"
                            ? "new-password"
                            : "current-password"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {formType === "sign-up"
                ? "Sign up with Email"
                : "Log in with Email"}
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
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4 outline outline-1 outline-offset-4 outline-zinc-400 rounded-md" />
        )}{" "}
        Github Account
      </Button>
    </div>
  )
}
