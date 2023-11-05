import { z } from "zod"

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
  })
  .refine((data) => data, {
    message: "Your email and password invalid.",
    path: ["password"],
    params: ["error"],
  })
