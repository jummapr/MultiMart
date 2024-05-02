import { z } from "zod"

const CategoryFilterSchema = z.object({
    items: z.array(z.string()),
  })

  export default CategoryFilterSchema