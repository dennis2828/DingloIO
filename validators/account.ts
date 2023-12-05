import z from "zod";

export const PROVIDERS = z.enum(["EMAIL","GOOGLE","GITHUB"]);

export const AccountValidator = z.object({
    username: z.string({required_error:"Username is required"}).min(3, "Username must be at least 3 characters"),
    email: z.string({required_error:"Email is required"}).email({message:"Email is invalid"}),
    password: z.optional(z.string({required_error:"Password is required"}).min(5,"Password must be at least 5 characters long")),
    confirmPassword: z.string(),
    provider: PROVIDERS.default("EMAIL"),
}).refine((data)=>data.password===data.confirmPassword, {
    message:"Passwords doesn't match",
    path:['confirmPassword'],
});

export type AccountRequest = z.infer<typeof AccountValidator>;