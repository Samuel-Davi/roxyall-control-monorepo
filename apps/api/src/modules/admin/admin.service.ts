import { prisma } from '../../db/prisma'
import { AppError } from '../../utils/error-handler'

export const getAllUsersService = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return { users, total: users.length }
}

export const getUserByIdService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  })

  if (!user) throw new AppError('Usuário não encontrado', 404)
  return user
}

export const toggleUserActiveService = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new AppError('Usuário não encontrado', 404)

  const updated = await prisma.user.update({
    where: { id },
    data: { isActive: !user.isActive },
    select: { isActive: true },
  })

  const status = updated.isActive ? 'ativado' : 'desativado'
  return {
    message: `Usuário ${status} com sucesso`,
    isActive: updated.isActive,
  }
}