import { FastifyRequest, FastifyReply } from 'fastify'
import { createCategorySchema, updateCategorySchema, categoryParamsSchema } from './categories.schema'
import {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from './categories.service'
import { handleError } from '../../utils/error-handler'

export async function createCategoryController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = createCategorySchema.parse(request.body)
    const category = await createCategoryService(data)
    return reply.status(201).send({ category })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function getCategoriesController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const categories = await getCategoriesService()
    return reply.status(200).send({ categories })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function getCategoryByIdController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = categoryParamsSchema.parse(request.params)
    const category = await getCategoryByIdService(id)
    return reply.status(200).send({ category })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function updateCategoryController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = categoryParamsSchema.parse(request.params)
    const data = updateCategorySchema.parse(request.body)
    const category = await updateCategoryService(id, data)
    return reply.status(200).send({ category })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function deleteCategoryController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = categoryParamsSchema.parse(request.params)
    await deleteCategoryService(id)
    return reply.status(200).send({ message: 'Categoria deletada com sucesso' })
  } catch (error) {
    return handleError(error, reply)
  }
}