import { prisma } from '../../db/prisma'
import { AppError } from '../../utils/error-handler'
import { CreateCardInput, UpdateCardInput } from './cards.schema'
import { Card } from '@prisma/client'

const formatCard = (card: Card) => ({
  ...card,
  limit: card.limit.toNumber(),
})

export const createCardService = async (userId: number, data: CreateCardInput) => {
  if (data.lastDigits) {
    const existing = await prisma.card.findFirst({
      where: {
        userId,
        lastDigits: data.lastDigits,
        name: data.name,
      },
    })

    if (existing) throw new AppError('Cartão com esse nome e últimos dígitos já cadastrado', 409)
  }

  const card = await prisma.card.create({ data: { ...data, userId } })
  return formatCard(card)
}

export const getCardsService = async (userId: number) => {
  const cards = await prisma.card.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return cards.map(formatCard)
}

export const getCardByIdService = async (userId: number, id: number) => {
  const card = await prisma.card.findUnique({ where: { id } })

  if (!card) throw new AppError('Cartão não encontrado', 404)
  if (card.userId !== userId) throw new AppError('Acesso negado', 403)

  return formatCard(card)
}

export const updateCardService = async (userId: number, id: number, data: UpdateCardInput) => {
  const card = await prisma.card.findUnique({ where: { id } })

  if (!card) throw new AppError('Cartão não encontrado', 404)
  if (card.userId !== userId) throw new AppError('Acesso negado', 403)

  const updated = await prisma.card.update({
    where: { id },
    data,
  })

  return formatCard(updated)
}

export const deleteCardService = async (userId: number, id: number) => {
  const card = await prisma.card.findUnique({ where: { id } })

  if (!card) throw new AppError('Cartão não encontrado', 404)
  if (card.userId !== userId) throw new AppError('Acesso negado', 403)

  await prisma.card.delete({ where: { id } })
}

export const getCardSummaryService = async (userId: number, id: number) => {
  const card = await prisma.card.findUnique({ where: { id } })

  if (!card) throw new AppError('Cartão não encontrado', 404)
  if (card.userId !== userId) throw new AppError('Acesso negado', 403)

  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  // Determina o ciclo atual da fatura com base no dia de fechamento
  let billingMonth = currentMonth
  let billingYear = currentYear

  if (now.getDate() > card.closingDay) {
    // Já fechou — estamos no ciclo do mês seguinte
    billingMonth = currentMonth === 12 ? 1 : currentMonth + 1
    billingYear = currentMonth === 12 ? currentYear + 1 : currentYear
  }

  // Busca transações do ciclo atual
  const startDate = new Date(
    billingMonth === 1 ? billingYear - 1 : billingYear,
    billingMonth === 1 ? 11 : billingMonth - 2,
    card.closingDay + 1
  )

  const endDate = new Date(billingYear, billingMonth - 1, card.closingDay)

  const transactions = await prisma.transaction.findMany({
    where: {
      cardId: id,
      type: 'EXPENSE',
      transactionDate: {
        gte: startDate,
        lte: endDate,
      },
    },
  })

  const used = transactions.reduce((acc, t) => acc + t.amount.toNumber(), 0)
  const limit = card.limit.toNumber()
  const available = limit - used

  return {
    cardId: card.id,
    name: card.name,
    limit,
    used,
    available,
    dueDay: card.dueDay,
    closingDay: card.closingDay,
    currentMonth: billingMonth,
    currentYear: billingYear,
  }
}