import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { authenticate } from '../../middlewares/authenticate'
import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from './categories.controller'
import {
  createCategorySchema,
  updateCategorySchema,
  categoryParamsSchema,
  categoryResponseSchema,
  categoriesListResponseSchema,
  deleteCategoryResponseSchema,
  errorSchema,
} from './categories.schema'

export const categoriesRoutes = async (app: FastifyInstance) => {
  const api = app.withTypeProvider<ZodTypeProvider>()

  api.post(
    '/',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Categories'],
        summary: 'Criar categoria',
        description: 'Cria uma nova categoria',
        security: [{ bearerAuth: [] }],
        body: createCategorySchema,
        response: {
          201: categoryResponseSchema,
          400: errorSchema,
          409: errorSchema,
          500: errorSchema,
        },
      },
    },
    createCategoryController
  )

  api.get(
    '/',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Categories'],
        summary: 'Listar categorias',
        description: 'Retorna todas as categorias',
        security: [{ bearerAuth: [] }],
        response: {
          200: categoriesListResponseSchema,
          500: errorSchema,
        },
      },
    },
    getCategoriesController
  )

  api.get(
    '/:id',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Categories'],
        summary: 'Buscar categoria por ID',
        description: 'Retorna os detalhes de uma categoria específica',
        security: [{ bearerAuth: [] }],
        params: categoryParamsSchema,
        response: {
          200: categoryResponseSchema,
          404: errorSchema,
          500: errorSchema,
        },
      },
    },
    getCategoryByIdController
  )

  api.put(
    '/:id',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Categories'],
        summary: 'Atualizar categoria',
        description: 'Atualiza os dados de uma categoria',
        security: [{ bearerAuth: [] }],
        params: categoryParamsSchema,
        body: updateCategorySchema,
        response: {
          200: categoryResponseSchema,
          400: errorSchema,
          404: errorSchema,
          409: errorSchema,
          500: errorSchema,
        },
      },
    },
    updateCategoryController
  )

  api.delete(
    '/:id',
    {
      preHandler: [authenticate],
      schema: {
        tags: ['Categories'],
        summary: 'Deletar categoria',
        description: 'Remove uma categoria',
        security: [{ bearerAuth: [] }],
        params: categoryParamsSchema,
        response: {
          200: deleteCategoryResponseSchema,
          404: errorSchema,
          409: errorSchema,
          500: errorSchema,
        },
      },
    },
    deleteCategoryController
  )
}