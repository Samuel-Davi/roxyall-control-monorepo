import { FastifyRequest, FastifyReply } from 'fastify'
import { createCardSchema, updateCardSchema, cardParamsSchema } from './cards.schema'
import {
  createCardService,
  getCardsService,
  getCardByIdService,
  updateCardService,
  deleteCardService,
  getCardSummaryService,
} from './cards.service'
import { handleError } from '../../utils/error-handler'

export async function createCardController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = createCardSchema.parse(request.body)
    const card = await createCardService(request.user.id, data)
    return reply.status(201).send({ card })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function getCardsController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const cards = await getCardsService(request.user.id)
    return reply.status(200).send({ cards })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function getCardByIdController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = cardParamsSchema.parse(request.params)
    const card = await getCardByIdService(request.user.id, id)
    return reply.status(200).send({ card })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function updateCardController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = cardParamsSchema.parse(request.params)
    const data = updateCardSchema.parse(request.body)
    const card = await updateCardService(request.user.id, id, data)
    return reply.status(200).send({ card })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function deleteCardController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = cardParamsSchema.parse(request.params)
    await deleteCardService(request.user.id, id)
    return reply.status(200).send({ message: 'Cartão deletado com sucesso' })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function getCardSummaryController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = cardParamsSchema.parse(request.params)
    const summary = await getCardSummaryService(request.user.id, id)
    return reply.status(200).send(summary)
  } catch (error) {
    return handleError(error, reply)
  }
}