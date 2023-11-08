import { z } from "zod"

export const CredentialsSchema = z.object({
  email: z.string().email({
    message: "Please, input valid email.",
  }),
  password: z
    .string({
      required_error: "Please, input your password.",
      invalid_type_error: "Please, input your password.",
    })
    .min(6)
    .max(50),
})
