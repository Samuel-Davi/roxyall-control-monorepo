import { prisma } from "../../db/prisma"
import { AppError } from "../../utils/error-handler"

export const getUserService = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            name: true,
        },
    })

    if (!user) throw new AppError('Usuário não encontrado', 404);

    return user
}

export const updateUserService = async (id: number, data: { email?: string; name?: string }) => {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) throw new AppError('Usuário não encontrado', 404);

    if (data.email && data.email !== user.email) {
        const existEmail = await prisma.user.findUnique({ where: { email: data.email } });
        if (existEmail) throw new AppError('Email já cadastrado', 409);
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data,
        select: {
            id: true,
            email: true,
            name: true,
        },
    })

    return updatedUser;
}

