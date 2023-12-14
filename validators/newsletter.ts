import z from "zod";

export const NewsletterValidator = z.object({
    email: z.string({required_error:"Email is required"}).email({message:"Email is invalid"}),
});

export type NewsletterRequest = z.infer<typeof NewsletterValidator>;