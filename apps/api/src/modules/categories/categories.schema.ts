import { z } from 'zod'

export const transactionTypeSchema = z.enum(['INCOME', 'EXPENSE'])

export const createCategorySchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter no mínimo 2 caracteres' }),
  description: z.string().optional(),
  icon: z.string().optional(),
  type: transactionTypeSchema,
})

export const updateCategorySchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter no mínimo 2 caracteres' }).optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  type: transactionTypeSchema.optional(),
})

export const categoryParamsSchema = z.object({
  id: z.coerce.number({ message: 'ID inválido' }),
})

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  type: transactionTypeSchema,
  createdAt: z.date(),
})

export const categoryResponseSchema = z.object({
  category: categorySchema,
})

export const categoriesListResponseSchema = z.object({
  categories: z.array(categorySchema),
})

export const deleteCategoryResponseSchema = z.object({
  message: z.string(),
})

export const errorSchema = z.object({
  error: z.string(),
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
export type CategoryParams = z.infer<typeof categoryParamsSchema>