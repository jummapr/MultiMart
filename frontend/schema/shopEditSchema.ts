import {z} from "zod";

const shopUpdateSchema = z.object({
    shopName: z.string().min(1),
    shopDescription: z.string(),
    shopAddress: z.string().min(1),
    phoneNumber: z.string()
        .min(10, "Mobile number must be at least 10 digits")
        .max(15, "Mobile number must be at most 15 digits")
        .regex(/^[0-9]+$/, "Mobile number must contain only digits"),
    zipcode: z.string().min(5, "Zip code must be 5 digits").max(10),
    email: z.string().email(),
});

export default shopUpdateSchema;
