import { z } from 'zod'

export const meResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['USER', 'ADMIN']),
    avatarUrl: z.string().nullable(),
    deleteUrl: z.string().nullable(),
    createdAt: z.date(),
  })
})

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(1, { message: 'Senha obrigatória' }),
  timeToken: z.enum(['1h', '30d']),
})

export const loginResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['USER', 'ADMIN']),
    avatarUrl: z.string().nullable(),
    deleteUrl: z.string().nullable(),
    createdAt: z.date(),
    token: z.string(),
    timeToken: z.enum(['1h', '30d']),
  }),
})

export const signupSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
  name: z.string().min(2, { message: 'Nome deve ter no mínimo 2 caracteres' }),
})

export const signupResponseSchema = z.object({
  message: z.string(),
})

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

export const resetPasswordResponseSchema = z.object({
  message: z.string(),
})

export const sendEmailSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  realCode: z.string().min(1, { message: 'Código obrigatório' }),
})

export const sendEmailResponseSchema = z.object({
  success: z.boolean(),
})

export const errorSchema = z.object({
  error: z.string(),
})

export type MeResponse = z.infer<typeof meResponseSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type SignupResponse = z.infer<typeof signupResponseSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type ResetPasswordResponse = z.infer<typeof resetPasswordResponseSchema>
export type SendEmailInput = z.infer<typeof sendEmailSchema>
export type SendEmailResponse = z.infer<typeof sendEmailResponseSchema>
export type ErrorResponse = z.infer<typeof errorSchema>