import { AuthForm } from "@/components/global/auth-form"
import Link from "next/link"
import { Command } from "lucide-react"

interface Props {
  searchParams?: Record<"callbackUrl" | "error", string>
}

export default async function SignIn({ searchParams }: Props) {
  return (
    <>
      <div className="md:hidden">
        <div className="h-20 bg-zinc-900 mb-6 grid place-items-center">
          <Link
            href="/"
            className="relative z-20 flex items-center text-lg font-medium text-white"
          >
            <Command className="mr-2 h-6 w-6" />
            Todos
          </Link>
        </div>
      </div>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col text-primary bg-muted p-10 dark:border-r lg:flex">
          <div className="absolute inset-0" />
          <Link
            href="/"
            className="relative z-20 flex items-center text-lg font-medium"
          >
            <Command className="mr-2 h-6 w-6" />
            Todos
          </Link>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl text-primary font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <AuthForm
              formType="sign-up"
              error={searchParams?.error}
              callbackUrl={searchParams?.callbackUrl}
            />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
