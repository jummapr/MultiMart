import { z } from "zod";

const createEventFormSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(100),
  category: z.string().min(1),
  start_date: z.date(),
  finish_date: z.date(),
  status: z.string(),
  tags: z.string(),
  originalPrice: z.string(),
  discountPrice: z.string(),
  stock: z.string(),
});

export default createEventFormSchema;
