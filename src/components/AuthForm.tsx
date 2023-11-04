"use client"
import * as React from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn, hash, toastCatch } from "@/app/lib/utils"
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
import { toast, useToast } from "./ui/use-toast"

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string
  error?: string
  formType: "sign-up" | "sign-in"
}

const createUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const response = await fetch("/api/v1/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error("Failed to create user")
  }

  return response.json()
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
  // const { toast } = useToast()
  const [loading, setLoading] = React.useState<boolean>(false)
  const { mutate: signUp } = useMutation({
    mutationFn: createUser,
    mutationKey: ["create", "user"],
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values
    setLoading(true)

    if (formType === "sign-up") {
      setLoading(true)
      signUp(
        { email, password },
        {
          onSuccess: () =>
            signIn("credentials", {
              email,
              password: hash(password),
            }),
          onError: toastCatch,
          onSettled: () => setLoading(false),
        }
      )
    } else {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: callbackUrl ?? "/todos",
      })
        .catch(toastCatch)
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
          <Github className="mr-2 h-4 w-4 outline outline-1 outline-offset-4 outline-zinc-400 rounded-md" />
        )}{" "}
        Github Account
      </Button>
      <Button onClick={() => toast({ title: "Test" })}>Toast</Button>
    </div>
  )
}
