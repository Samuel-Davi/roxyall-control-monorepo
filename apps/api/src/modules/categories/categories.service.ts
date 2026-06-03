import { prisma } from '../../db/prisma'
import { AppError } from '../../utils/error-handler'
import { CreateCategoryInput, UpdateCategoryInput } from './categories.schema'

export const createCategoryService = async (data: CreateCategoryInput) => {
  const existing = await prisma.category.findFirst({
    where: { name: data.name, type: data.type },
  })

  if (existing) throw new AppError('Categoria com esse nome e tipo já existe', 409)

  return prisma.category.create({ data })
}

export const getCategoriesService = async () => {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  })
}

export const getCategoryByIdService = async (id: number) => {
  const category = await prisma.category.findUnique({ where: { id } })
  if (!category) throw new AppError('Categoria não encontrada', 404)
  return category
}

export const updateCategoryService = async (id: number, data: UpdateCategoryInput) => {
  const category = await prisma.category.findUnique({ where: { id } })
  if (!category) throw new AppError('Categoria não encontrada', 404)

  if (data.name || data.type) {
    const existing = await prisma.category.findFirst({
      where: {
        name: data.name ?? category.name,
        type: data.type ?? category.type,
        NOT: { id },
      },
    })
    if (existing) throw new AppError('Categoria com esse nome e tipo já existe', 409)
  }

  return prisma.category.update({ where: { id }, data })
}

export const deleteCategoryService = async (id: number) => {
  const category = await prisma.category.findUnique({ where: { id } })
  if (!category) throw new AppError('Categoria não encontrada', 404)

  const inUse = await prisma.transaction.findFirst({ where: { categoryId: id } })
  if (inUse) throw new AppError('Categoria em uso por transações e não pode ser deletada', 409)

  await prisma.category.delete({ where: { id } })
}