import { FastifyRequest, FastifyReply } from 'fastify'
import { createAccountSchema, updateAccountSchema, accountParamsSchema } from './accounts.schema'
import {
  createAccountService,
  getAccountsService,
  getAccountByIdService,
  updateAccountService,
  deleteAccountService,
  getAccountsSummaryService,
} from './accounts.service'
import { handleError } from '../../utils/error-handler'

export async function createAccountController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = createAccountSchema.parse(request.body)
    const account = await createAccountService(request.user.id, data)
    return reply.status(201).send({ account })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function getAccountsController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const accounts = await getAccountsService(request.user.id)
    return reply.status(200).send({ accounts })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function getAccountByIdController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = accountParamsSchema.parse(request.params)
    const account = await getAccountByIdService(request.user.id, id)
    return reply.status(200).send({ account })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function updateAccountController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = accountParamsSchema.parse(request.params)
    const data = updateAccountSchema.parse(request.body)
    const account = await updateAccountService(request.user.id, id, data)
    return reply.status(200).send({ account })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function deleteAccountController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = accountParamsSchema.parse(request.params)
    await deleteAccountService(request.user.id, id)
    return reply.status(200).send({ message: 'Conta deletada com sucesso' })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function getAccountsSummaryController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const summary = await getAccountsSummaryService(request.user.id)
    return reply.status(200).send(summary)
  } catch (error) {
    return handleError(error, reply)
  }
}