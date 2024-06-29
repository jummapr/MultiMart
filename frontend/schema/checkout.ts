import { z } from "zod";

const checkoutSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  address1: z.string().min(1, { message: "Address 1 is required" }),
  address2: z.string().min(1, { message: "Address 2 is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
});

export default checkoutSchema;
