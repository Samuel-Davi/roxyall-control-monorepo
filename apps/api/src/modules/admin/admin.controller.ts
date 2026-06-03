import { FastifyRequest, FastifyReply } from 'fastify'
import { userParamsSchema } from './admin.schema'
import { getAllUsersService, getUserByIdService, toggleUserActiveService } from './admin.service'
import { handleError } from '../../utils/error-handler'

export async function getAllUsersController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const result = await getAllUsersService()
    return reply.status(200).send(result)
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function getUserByIdController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = userParamsSchema.parse(request.params)
    const user = await getUserByIdService(id)
    return reply.status(200).send({ user })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function toggleUserActiveController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = userParamsSchema.parse(request.params)
    const result = await toggleUserActiveService(id)
    return reply.status(200).send(result)
  } catch (error) {
    return handleError(error, reply)
  }
}