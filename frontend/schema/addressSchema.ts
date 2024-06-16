import { z } from "zod";

const addressSchema = z.object({
  country: z.string().min(1, { message: "Country is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  address1: z.string().min(1, { message: "Address 1 is required" }),
  address2: z.string().min(1, { message: "Address 2 is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
  addresstype: z.string().min(1, { message: "Address type is required" }),
});

export default addressSchema;
