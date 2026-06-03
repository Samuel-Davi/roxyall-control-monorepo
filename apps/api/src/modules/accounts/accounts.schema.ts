import { z } from 'zod'

export const accountTypeSchema = z.enum(['CHECKING', 'SAVINGS', 'CASH', 'OTHER'])

export const createAccountSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter no mínimo 2 caracteres' }),
  type: accountTypeSchema,
  balance: z.number().default(0),
  isFloat: z.boolean().default(false),
})

export const updateAccountSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter no mínimo 2 caracteres' }).optional(),
  type: accountTypeSchema.optional(),
  balance: z.number().optional(),
  isFloat: z.boolean().optional(),
})

export const accountParamsSchema = z.object({
  id: z.coerce.number({ message: 'ID inválido' }),
})

export const accountResponseSchema = z.object({
  account: z.object({
    id: z.number(),
    userId: z.number(),
    name: z.string(),
    type: accountTypeSchema,
    balance: z.number(),
    isFloat: z.boolean(),
    createdAt: z.date(),
  }),
})

export const accountsListResponseSchema = z.object({
  accounts: z.array(
    z.object({
      id: z.number(),
      userId: z.number(),
      name: z.string(),
      type: accountTypeSchema,
      balance: z.number(),
      isFloat: z.boolean(),
      createdAt: z.date(),
    })
  ),
})

export const accountsSummaryResponseSchema = z.object({
  totalBalance: z.number(),
  floatBalance: z.number(),
  accounts: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      type: accountTypeSchema,
      balance: z.number(),
      isFloat: z.boolean(),
    })
  ),
})

export const deleteAccountResponseSchema = z.object({
  message: z.string(),
})

export const errorSchema = z.object({
  error: z.string(),
})

export type CreateAccountInput = z.infer<typeof createAccountSchema>
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>
export type AccountParams = z.infer<typeof accountParamsSchema>