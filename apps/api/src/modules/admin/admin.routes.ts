import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { authenticate } from '../../middlewares/authenticate'
import { authorizeAdmin } from '../../middlewares/authorize'
import { getAllUsersController, getUserByIdController, toggleUserActiveController } from './admin.controller'
import {
  usersListResponseSchema,
  userDetailResponseSchema,
  toggleUserResponseSchema,
  userParamsSchema,
  errorSchema,
} from './admin.schema'

export const adminRoutes = async (app: FastifyInstance) => {
  const api = app.withTypeProvider<ZodTypeProvider>()

  api.get(
    '/users',
    {
      onRequest: [authenticate, authorizeAdmin],
      schema: {
        tags: ['Admin'],
        summary: 'Listar todos os usuários',
        description: 'Retorna todos os usuários do sistema',
        security: [{ bearerAuth: [] }],
        response: {
          200: usersListResponseSchema,
          403: errorSchema,
          500: errorSchema,
        },
      },
    },
    getAllUsersController
  )

  api.get(
    '/users/:id',
    {
      onRequest: [authenticate, authorizeAdmin],
      schema: {
        tags: ['Admin'],
        summary: 'Buscar usuário por ID',
        description: 'Retorna os detalhes de um usuário específico',
        security: [{ bearerAuth: [] }],
        params: userParamsSchema,
        response: {
          200: userDetailResponseSchema,
          403: errorSchema,
          404: errorSchema,
          500: errorSchema,
        },
      },
    },
    getUserByIdController
  )

  api.patch(
    '/users/:id/toggle-active',
    {
      onRequest: [authenticate, authorizeAdmin],
      schema: {
        tags: ['Admin'],
        summary: 'Ativar ou desativar usuário',
        description: 'Alterna o status de ativo/inativo de um usuário',
        security: [{ bearerAuth: [] }],
        params: userParamsSchema,
        response: {
          200: toggleUserResponseSchema,
          403: errorSchema,
          404: errorSchema,
          500: errorSchema,
        },
      },
    },
    toggleUserActiveController
  )
}