import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { authenticate } from '../../middlewares/authenticate'
import {
  createCardController,
  getCardsController,
  getCardByIdController,
  updateCardController,
  deleteCardController,
  getCardSummaryController,
} from './cards.controller'
import {
  createCardSchema,
  updateCardSchema,
  cardParamsSchema,
  cardResponseSchema,
  cardsListResponseSchema,
  cardSummaryResponseSchema,
  deleteCardResponseSchema,
  errorSchema,
} from './cards.schema'

export const cardsRoutes = async (app: FastifyInstance) => {
  const api = app.withTypeProvider<ZodTypeProvider>()

  api.post(
    '/',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Cards'],
        summary: 'Criar cartão',
        description: 'Cria um novo cartão de crédito',
        security: [{ bearerAuth: [] }] ,
        body: createCardSchema,
        response: {
          201: cardResponseSchema,
          400: errorSchema,
          500: errorSchema,
        },
      },
    },
    createCardController
  )

  api.get(
    '/',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Cards'],
        summary: 'Listar cartões',
        description: 'Retorna todos os cartões do usuário',
        security: [{ bearerAuth: [] }] ,
        response: {
          200: cardsListResponseSchema,
          500: errorSchema,
        },
      },
    },
    getCardsController
  )

  api.get(
    '/:id',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Cards'],
        summary: 'Buscar cartão por ID',
        description: 'Retorna os detalhes de um cartão específico',
        security: [{ bearerAuth: [] }] ,
        params: cardParamsSchema,
        response: {
          200: cardResponseSchema,
          403: errorSchema,
          404: errorSchema,
          500: errorSchema,
        },
      },
    },
    getCardByIdController
  )

  api.get(
    '/:id/summary',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Cards'],
        summary: 'Resumo do cartão',
        description: 'Retorna limite total, usado e disponível da fatura atual',
        security: [{ bearerAuth: [] }] ,
        params: cardParamsSchema,
        response: {
          200: cardSummaryResponseSchema,
          403: errorSchema,
          404: errorSchema,
          500: errorSchema,
        },
      },
    },
    getCardSummaryController
  )

  api.put(
    '/:id',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Cards'],
        summary: 'Atualizar cartão',
        description: 'Atualiza os dados de um cartão',
        security: [{ bearerAuth: [] }] ,
        params: cardParamsSchema,
        body: updateCardSchema,
        response: {
          200: cardResponseSchema,
          400: errorSchema,
          403: errorSchema,
          404: errorSchema,
          500: errorSchema,
        },
      },
    },
    updateCardController
  )

  api.delete(
    '/:id',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Cards'],
        summary: 'Deletar cartão',
        description: 'Remove um cartão de crédito',
        security: [{ bearerAuth: [] }] ,
        params: cardParamsSchema,
        response: {
          200: deleteCardResponseSchema,
          403: errorSchema,
          404: errorSchema,
          500: errorSchema,
        },
      },
    },
    deleteCardController
  )
}