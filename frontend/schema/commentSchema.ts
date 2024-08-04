import { z } from "zod";


const commentSchema = z.object({
    comment: z.string().min(2).max(1000),
});

export default commentSchema