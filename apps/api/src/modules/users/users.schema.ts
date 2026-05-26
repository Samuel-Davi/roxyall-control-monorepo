import z from "zod";

export const updateUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().email({ message: "Email Inválido" }).optional(),
})

export const userResponseSchema = z.object({
    user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    avatarUrl: z.string().nullable(),
    deleteUrl: z.string().nullable(),
    createdAt: z.date(),
  }),
})

export const userDeleteResponseSchema = z.object({
    message: z.string(),
})

export const errorSchema = z.object({
    error: z.string(),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type UserResponse = z.infer<typeof userResponseSchema>
export type ErrorResponse = z.infer<typeof errorSchema>