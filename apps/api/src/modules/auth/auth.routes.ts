import { FastifyInstance } from 'fastify'
import {
  loginController,
  signupController,
  resetPasswordController,
  sendEmailController,
} from './auth.controller'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { loginSchema, signupSchema, resetPasswordSchema, sendEmailSchema, loginResponseSchema, errorSchema, signupResponseSchema, resetPasswordResponseSchema, sendEmailResponseSchema } from './auth.schema'

export const authRoutes = async (app: FastifyInstance) => {
  const api = app.withTypeProvider<ZodTypeProvider>()

  // Login
  api.post(
    '/auth',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Fazer login',
        description: 'Autentica um usuário e retorna um token JWT',
        body: loginSchema,
        response: {
          200: loginResponseSchema,
          404: errorSchema,
          500: errorSchema,
        },
      },
    },
    loginController
  )

  // Signup
  api.post(
    '/signup',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Criar nova conta',
        description: 'Registra um novo usuário',
        body: signupSchema,
        response: {
          201: signupResponseSchema,
          400: errorSchema,
          500: errorSchema,
        },
      },
    },
    signupController
  )

  // Reset Password
  api.post(
    '/reset-password',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Redefinir senha',
        description: 'Atualiza a senha de um usuário',
        body: resetPasswordSchema,
        response: {
          200: resetPasswordResponseSchema,
          400: errorSchema,
          500: errorSchema,
        },
      },
    },
    resetPasswordController
  )

  // Send Email
  api.post(
    '/send-email',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Enviar email de recuperação',
        description: 'Envia um código de recuperação por email',
        body: sendEmailSchema,
        response: {
          200: sendEmailResponseSchema,
          400: errorSchema,
          500: errorSchema,
        },
      },
    },
    sendEmailController
  )
}