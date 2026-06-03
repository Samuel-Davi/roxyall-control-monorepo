import { FastifyRequest, FastifyReply } from 'fastify'
import { updateUserSchema } from './users.schema'
import { updateUserService } from './users.service'
import { handleError } from '../../utils/error-handler'

export async function updateUserController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = updateUserSchema.parse(request.body)
    const user = await updateUserService(request.user.id, data)
    return reply.status(200).send({ user })
  } catch (error) {
    return handleError(error, reply)
  }
}