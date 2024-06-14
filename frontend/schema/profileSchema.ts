import { ZodString, z } from "zod"

const profileSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.number().max(10).nullable().optional(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(32),
    zipcode: z.number().max(6).nullable().optional(),
    address1: z.string(),
    address2: z.string()
  })

  export default profileSchema