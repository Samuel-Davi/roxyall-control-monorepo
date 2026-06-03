import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { authenticate } from '../../middlewares/authenticate'
import {
  createAccountController,
  getAccountsController,
  getAccountByIdController,
  updateAccountController,
  deleteAccountController,
  getAccountsSummaryController,
} from './accounts.controller'
import {
  createAccountSchema,
  updateAccountSchema,
  accountParamsSchema,
  accountResponseSchema,
  accountsListResponseSchema,
  accountsSummaryResponseSchema,
  deleteAccountResponseSchema,
  errorSchema,
} from './accounts.schema'

export const accountsRoutes = async (app: FastifyInstance) => {
  const api = app.withTypeProvider<ZodTypeProvider>()

  api.post(
    '/',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Accounts'],
        summary: 'Criar conta',
        description: 'Cria uma nova conta bancária',
        security: [{ bearerAuth: []}],
        body: createAccountSchema,
        response: {
          201: accountResponseSchema,
          400: errorSchema,
          500: errorSchema,
        },
      },
    },
    createAccountController
  )

  api.get(
    '/',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Accounts'],
        summary: 'Listar contas',
        description: 'Retorna todas as contas do usuário',
        security: [{ bearerAuth: []}],
        response: {
          200: accountsListResponseSchema,
          500: errorSchema,
        },
      },
    },
    getAccountsController
  )

  api.get(
    '/summary',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Accounts'],
        summary: 'Resumo de contas',
        description: 'Retorna saldo total excluindo floats e saldo por conta',
        security: [{ bearerAuth: []}],
        response: {
          200: accountsSummaryResponseSchema,
          500: errorSchema,
        },
      },
    },
    getAccountsSummaryController
  )

  api.get(
    '/:id',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Accounts'],
        summary: 'Buscar conta por ID',
        description: 'Retorna os detalhes de uma conta específica',
        security: [{ bearerAuth: []}],
        params: accountParamsSchema,
        response: {
          200: accountResponseSchema,
          403: errorSchema,
          404: errorSchema,
          500: errorSchema,
        },
      },
    },
    getAccountByIdController
  )

  api.put(
    '/:id',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Accounts'],
        summary: 'Atualizar conta',
        description: 'Atualiza os dados de uma conta',
        security: [{ bearerAuth: []}],
        params: accountParamsSchema,
        body: updateAccountSchema,
        response: {
          200: accountResponseSchema,
          400: errorSchema,
          403: errorSchema,
          404: errorSchema,
          500: errorSchema,
        },
      },
    },
    updateAccountController
  )

  api.delete(
    '/:id',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Accounts'],
        summary: 'Deletar conta',
        description: 'Remove uma conta bancária',
        security: [{ bearerAuth: []}],
        params: accountParamsSchema,
        response: {
          200: deleteAccountResponseSchema,
          403: errorSchema,
          404: errorSchema,
          500: errorSchema,
        },
      },
    },
    deleteAccountController
  )
}