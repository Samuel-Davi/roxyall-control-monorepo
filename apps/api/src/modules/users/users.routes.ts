import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { authenticate } from '../../middlewares/authenticate'
import { updateUserController } from './users.controller'
import { updateUserSchema, userResponseSchema, errorSchema } from './users.schema'

export const usersRoutes = async (app: FastifyInstance) => {
  const api = app.withTypeProvider<ZodTypeProvider>()

  api.put(
    '/me',
    {
      preHandler: authenticate,
      schema: {
        tags: ['Users'],
        summary: 'Atualizar usuário',
        description: 'Atualiza nome e/ou email do usuário logado',
        security: [{ bearerAuth: [] }],
        body: updateUserSchema,
        response: {
          200: userResponseSchema,
          400: errorSchema,
          409: errorSchema,
          500: errorSchema,
        },
      },
    },
    updateUserController
  )
}