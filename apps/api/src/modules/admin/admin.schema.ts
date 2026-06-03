import { z } from 'zod'

export const userParamsSchema = z.object({
  id: z.coerce.number({ message: 'ID inválido' }),
})

export const usersListResponseSchema = z.object({
  users: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
      role: z.enum(['USER', 'ADMIN']),
      isActive: z.boolean(),
      createdAt: z.date(),
    })
  ),
  total: z.number(),
})

export const userDetailResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['USER', 'ADMIN']),
    isActive: z.boolean(),
    createdAt: z.date(),
  }),
})

export const toggleUserResponseSchema = z.object({
  message: z.string(),
  isActive: z.boolean(),
})

export const errorSchema = z.object({
  error: z.string(),
})

export type UserParams = z.infer<typeof userParamsSchema>