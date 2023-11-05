"use client"

import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { HTTP_RESPONSE_CODE, cn, hash, toastCatch } from "@/lib/utils"
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
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { serverError } from "@/lib/api"
import { isAxiosError } from "axios"
import { signupSchema } from "@/lib/validations/signup"
import { createUser } from "./api"

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
  const [loading, setLoading] = useState<boolean>(false)
  const { push } = useRouter()
  const { mutate: signUp } = useMutation({
    mutationFn: createUser,
    mutationKey: ["create", "user"],
  })
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    const { email, password } = values
    setLoading(true)

    if (formType === "sign-up") {
      setLoading(true)
      signUp(
        { email, password },
        {
          onSuccess: (res) => {
            console.log({ res })
            if (res.status === HTTP_RESPONSE_CODE.POST) {
              signIn("credentials", {
                email,
                password: hash(password),
                redirect: false,
              })
                .then((res) => {
                  if (res && res.ok) push("/todos")
                })
                .catch(toastCatch)
            } else {
              toastCatch(new Error(res.data.message))
            }
          },
          onError: (err) => {
            if (isAxiosError(err)) {
              toastCatch(err.response?.data)
            } else {
              toastCatch(err)
            }
          },
          onSettled: () => setLoading(false),
        }
      )
    } else {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
        .then((res) => {
          if (res) {
            if (res.error && !res.ok) {
              toastCatch(new Error(res.error))
            } else {
              push("/todos")
            }
          } else {
            serverError(res)
          }
        })
        .finally(() => setLoading(false))
    }
  }

  const handleGithubSignIn = () => {
    setLoading(true)
    signIn("github", { callbackUrl: "/todos", redirect: true })
      .then((response) => {
        console.log("response", { response })
        if (response?.error) {
          // show notification for user
          console.log(response)
        } else {
          // redirect to destination page
          console.log(response)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
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
                        disabled={loading}
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
            <Button type="submit" disabled={loading}>
              {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
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
        disabled={loading}
      >
        {loading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4 outline outline-1 outline-offset-4 outline-foreground rounded-xl" />
        )}{" "}
        Github Account
      </Button>
    </div>
  )
}
