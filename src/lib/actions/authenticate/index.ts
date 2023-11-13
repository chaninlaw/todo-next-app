"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { hash } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { CredentialsSchema } from "./validation"

export async function register(credentials: z.infer<typeof CredentialsSchema>) {
  const validatedFields = CredentialsSchema.safeParse(credentials)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to register.",
    }
  }

  const { email, password } = validatedFields.data

  const hasUser = await prisma.user.findUnique({ where: { email } })

  if (hasUser) return { message: "Email is already exists!" }

  await prisma.user.create({
    data: {
      email,
      password: hash(password),
      role: "USER",
      name: email,
    },
  })

  revalidatePath("/todo")
  redirect("/todo")
}
