import { z } from "zod";

export const StripePaymentSchema = z.object({
  nameOnCard: z.string().min(1, { message: "Name on card is required" }),
  CardNumber: z.string(),
  expires: z.string(),
  cvc: z.string(),
});
