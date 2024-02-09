import { z } from "zod"

export const LoginFormSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(32),
  })