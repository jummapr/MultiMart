import { z } from "zod";

export const StripePaymentSchema = z.object({
  nameOnCard: z.string().min(1, { message: "Name on card is required" }),
  CardNumber: z.string().min(1, { message: "Card number is required" }),
  expires: z.string().min(1, { message: "Expires is required" }),
  cvc: z.string().min(1, { message: "CVC is required" }),
});
