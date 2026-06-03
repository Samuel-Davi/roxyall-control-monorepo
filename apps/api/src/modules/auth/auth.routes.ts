import { FastifyInstance } from 'fastify'
import {
  loginController,
  signupController,
  resetPasswordController,
  sendEmailController,
  meController,
} from './auth.controller'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { 
  loginSchema,
  signupSchema, 
  resetPasswordSchema,
  sendEmailSchema, 
  loginResponseSchema, 
  errorSchema,
  signupResponseSchema, 
  resetPasswordResponseSchema, 
  sendEmailResponseSchema, 
  meResponseSchema } from './auth.schema'
import { authenticate } from '../../middlewares/authenticate'

export const authRoutes = async (app: FastifyInstance) => {
  const api = app.withTypeProvider<ZodTypeProvider>()

  // Me
  api.get(
    '/me',
    {
      preHandler: authenticate,
      schema: {
        tags: ['Auth'],
        summary: 'Obter dados do usuário',
        description: 'Retorna os dados do usuário autenticado',
        security: [{ bearerAuth: [] }],
        response: {
          200: meResponseSchema,
          404: errorSchema,
          500: errorSchema,
        },
      },
    },
    meController
  )

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