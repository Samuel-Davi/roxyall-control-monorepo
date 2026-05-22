import { FastifyRequest, FastifyReply } from 'fastify'
import { loginService, signupService, resetPasswordService, sendEmailService } from './auth.service'
import { handleError, AppError } from '../../utils/error-handler'
import { LoginInput, SignupInput, ResetPasswordInput, SendEmailInput } from './auth.schema'

export async function loginController(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply,
) {
  try {
    const { email, password, timeToken } = request.body
    const user = await loginService(email, password, timeToken)
    return reply.status(200).send({ user })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function signupController(
  request: FastifyRequest<{ Body: SignupInput }>,
  reply: FastifyReply,
) {
  try {
    const { email, password, name } = request.body
    await signupService(email, password, name)
    return reply.status(201).send({ message: 'Usuário criado com sucesso' })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function resetPasswordController(
  request: FastifyRequest<{ Body: ResetPasswordInput }>,
  reply: FastifyReply,
) {
  try {
    const { email, password } = request.body
    await resetPasswordService(email, password)
    return reply.status(200).send({ message: 'Senha atualizada com sucesso' })
  } catch (error) {
    return handleError(error, reply)
  }
}

export async function sendEmailController(
  request: FastifyRequest<{ Body: SendEmailInput }>,
  reply: FastifyReply,
) {
  try {
    const { email, realCode } = request.body
    await sendEmailService(email, realCode)
    return reply.status(200).send({ success: true })
  } catch (error) {
    return handleError(error, reply)
  }
}