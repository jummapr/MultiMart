import { z } from "zod";

const discountCouponCode = z.object({
  code: z
    .string()
    .min(1, { message: "Coupon is required" })
    .regex(/^[A-Za-z0-9_-]{3,20}$/, { message: "Invalid coupon code" }),
});

export default discountCouponCode;
