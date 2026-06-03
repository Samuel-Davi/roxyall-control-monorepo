import { z } from 'zod'

export const createCardSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter no mínimo 2 caracteres' }),
  lastDigits: z.string().length(4, { message: 'Últimos 4 dígitos obrigatórios' }).optional(),
  limit: z.number().positive({ message: 'Limite deve ser positivo' }),
  closingDay: z.number().min(1).max(31, { message: 'Dia inválido' }),
  dueDay: z.number().min(1).max(31, { message: 'Dia inválido' }),
})

export const updateCardSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter no mínimo 2 caracteres' }).optional(),
  lastDigits: z.string().length(4).optional(),
  limit: z.number().positive({ message: 'Limite deve ser positivo' }).optional(),
  closingDay: z.number().min(1).max(31, { message: 'Dia inválido' }).optional(),
  dueDay: z.number().min(1).max(31, { message: 'Dia inválido' }).optional(),
})

export const cardParamsSchema = z.object({
  id: z.coerce.number({ message: 'ID inválido' }),
})

const cardSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  lastDigits: z.string().nullable(),
  limit: z.number(),
  closingDay: z.number(),
  dueDay: z.number(),
  createdAt: z.date(),
})

export const cardResponseSchema = z.object({
  card: cardSchema,
})

export const cardsListResponseSchema = z.object({
  cards: z.array(cardSchema),
})

export const cardSummaryResponseSchema = z.object({
  cardId: z.number(),
  name: z.string(),
  limit: z.number(),
  used: z.number(),
  available: z.number(),
  dueDay: z.number(),
  closingDay: z.number(),
  currentMonth: z.number(),
  currentYear: z.number(),
})

export const deleteCardResponseSchema = z.object({
  message: z.string(),
})

export const errorSchema = z.object({
  error: z.string(),
})

export type CreateCardInput = z.infer<typeof createCardSchema>
export type UpdateCardInput = z.infer<typeof updateCardSchema>
export type CardParams = z.infer<typeof cardParamsSchema>