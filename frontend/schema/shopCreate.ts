import { z } from "zod";

const ShopCreateSchema = z.object({
  shopName: z.string().min(1),
  phoneNumber: z.string().max(12).nullable(),
  address: z.string(),
  zipcode: z.string().max(6).nullable(),
  file: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
    .regex(/[a-z]/, {
      message: "Password must include at least one lowercase letter",
    }) // At least one lowercase letter
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter",
    }) // At least one uppercase letter
    .regex(/[0-9]/, { message: "Password must include at least one number" }) // At least one number
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must include at least one special character",
    }),
});

export default ShopCreateSchema;
