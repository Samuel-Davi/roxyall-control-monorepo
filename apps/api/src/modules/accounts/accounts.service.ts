import { Account } from '@prisma/client'
import { prisma } from '../../db/prisma'
import { AppError } from '../../utils/error-handler'
import { CreateAccountInput, UpdateAccountInput } from './accounts.schema'

const formatAccount = (account: Account) => ({
  ...account,
  balance: account.balance.toNumber(),
})

export const createAccountService = async (userId: number, data: CreateAccountInput) => {
  const account = await prisma.account.create({
    data: { ...data, userId },
  })

  return formatAccount(account)
}

export const getAccountsService = async (userId: number) => {
  const accounts = await prisma.account.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return accounts.map(formatAccount)
}

export const getAccountByIdService = async (userId: number, id: number) => {
  const account = await prisma.account.findUnique({ where: { id } })

  if (!account) throw new AppError('Conta não encontrada', 404)
  if (account.userId !== userId) throw new AppError('Acesso negado', 403)

  return formatAccount(account)
}

export const updateAccountService = async (userId: number, id: number, data: UpdateAccountInput) => {
  const account = await prisma.account.findUnique({ where: { id } })

  if (!account) throw new AppError('Conta não encontrada', 404)
  if (account.userId !== userId) throw new AppError('Acesso negado', 403)

  const updated = await prisma.account.update({
    where: { id },
    data,
  })

  return formatAccount(updated)
}

export const deleteAccountService = async (userId: number, id: number) => {
  const account = await prisma.account.findUnique({ where: { id } })

  if (!account) throw new AppError('Conta não encontrada', 404)
  if (account.userId !== userId) throw new AppError('Acesso negado', 403)

  await prisma.account.delete({ where: { id } })
}

export const getAccountsSummaryService = async (userId: number) => {
  const accounts = await prisma.account.findMany({
    where: { userId },
  })

  const formatted = accounts.map(formatAccount)

  const totalBalance = formatted
    .filter(a => !a.isFloat)
    .reduce((acc, a) => acc + a.balance, 0)

  const floatBalance = formatted
    .filter(a => a.isFloat)
    .reduce((acc, a) => acc + a.balance, 0)

  return { totalBalance, floatBalance, accounts: formatted }
}