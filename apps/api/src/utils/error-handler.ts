import { ZodError } from 'zod'
import { FastifyReply } from 'fastify'

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function handleError(error: unknown, reply: FastifyReply) {
  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }))

    return reply.status(400).send({
      error: 'Erro de validação',
      details: formattedErrors,
    })
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      error: error.message,
    })
  }

  if (error instanceof Error) {
    console.log(error)
    return reply.status(500).send({
      error: 'Erro interno do servidor',
      message: error.message,
    })
  }

  return reply.status(500).send({
    error: 'Erro desconhecido',
  })
}
