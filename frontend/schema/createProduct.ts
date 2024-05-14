import { z } from "zod";

const CreateProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(100),
  category: z.string().min(1),
  tags: z.string(),
  originalPrice: z.string(),
  discountPrice: z.string(),
  stock: z.string(),
});

export default CreateProductSchema;
