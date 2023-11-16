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
    const message = "Missing Fields. Failed to register."
    const cause = validatedFields.error.flatten().fieldErrors
    throw new Error(message, { cause })
  }

  try {
    const { email, password } = validatedFields.data

    const hasUser = await prisma.user.findUnique({ where: { email } })

    if (hasUser) throw new Error("Email is already exists!")

    await prisma.user.create({
      data: {
        email,
        password: hash(password),
        role: "USER",
        name: email,
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message, { cause: error.cause })
    } else {
      throw error
    }
  }

  revalidatePath("/todo")
  redirect("/todo")
}
