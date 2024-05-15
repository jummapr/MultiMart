import { z } from "zod";

const couponCodeSchema = z.object({
  name: z.string(),
  value: z.string(),
  minAmount: z.string(),
  maxAmount: z.string(),
  selectedProducts: z.string(),
});

export default couponCodeSchema;
