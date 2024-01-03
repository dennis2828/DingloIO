import z from "zod";

export const AnswerValidator = z.object({
    id: z.string({required_error:"You must provide an required"}),
    projectId: z.string({required_error:"You must provide a project id"}),
    question: z.string({required_error:"Question is required"}),
    answer:z.string({required_error:"Answer is required"}),
});

export type AnswerRequest = z.infer<typeof AnswerValidator>;

export const AnswerEditValidator = z.object({
    question: z.optional(z.string({required_error:"Question is required"})),
    answer: z.optional(z.string({required_error:"Answer is required"})),
});

export type AnswerEditRequest = z.infer<typeof AnswerEditValidator>;
