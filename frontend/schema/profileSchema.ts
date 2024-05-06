import { ZodString, z } from "zod"

const profileSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.number().max(10).nullable().optional(),
    zipcode: z.number().max(6).nullable().optional(),
    address1: z.string(),
    address2: z.string()
  })

  export default profileSchema