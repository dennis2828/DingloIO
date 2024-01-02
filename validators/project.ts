import z from "zod";

export const ProjectValidator = z.object({
    projectName: z.string({required_error:"Project name is required"}).min(3, "Project name must be at least 3 characters"),
    projectPassword: z.string({required_error:"Password is required"}).min(5,"Password must be at least 5 characters long"),
    projectConfirmPassword: z.string(),
}).refine((data)=>data.projectPassword===data.projectConfirmPassword, {
    message:"Passwords doesn't match",
    path:['projectConfirmPassword'],
});

export type ProjectRequest = z.infer<typeof ProjectValidator>;

export const ProjectUpdateValidator = z.object({
    projectName: z.optional(z.string({required_error:"Project name is required"}).min(3, "Project name must be at least 3 characters")),
    agentName: z.optional(z.string({required_error:"Agent name is required"}).min(3, "Agent name must be at least 3 characters")),
    agentImage: z.optional(z.string({required_error:"Image is required"})),
});

export type ProjectUpdateRequest = z.infer<typeof ProjectUpdateValidator>;