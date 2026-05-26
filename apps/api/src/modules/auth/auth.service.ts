import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import { prisma } from '../../db/prisma'
import { env } from '../../config/env'
import { AppError } from '../../utils/error-handler'

const createTransport = () => {
  if (!env.GMAIL_USER || !env.GMAIL_PASSWORD) {
    throw new AppError('Configurações de email não definidas no ambiente', 500)
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: env.GMAIL_USER,
      pass: env.GMAIL_PASSWORD,
    },
  })
}

export async function meService(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      avatarUrl: true,
      deleteUrl: true,
      createdAt: true,
    },
  })

  if (!user) throw new AppError('Usuário não encontrado', 404)

  return user
}

export async function loginService(email: string, password: string, timeToken: string) {
  const user = await prisma.user.findUnique({ where: { email }})

  if (!user) throw new AppError('Usuário não encontrado', 404)

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) throw new AppError('Email ou senha inválidos', 401)

  const expiresIn = timeToken === '1h' ? '1h' : '30d'
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, env.JWT_SECRET, { expiresIn })

  const { password: _password, ...userWithoutPassword } = user
  return { ...userWithoutPassword, token, timeToken }
}

export async function signupService(email: string, password: string, name: string) {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) throw new AppError('Email já cadastrado', 409)

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })
}

export async function resetPasswordService(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new AppError('Usuário não encontrado', 404)

  const hashedPassword = await bcrypt.hash(password, 10)
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  })
}

export async function sendEmailService(email: string, realCode: string) {
  const transport = createTransport()

  await transport.sendMail({
    from: `Roxyall Control <${env.GMAIL_USER}>`,
    to: email,
    subject: 'Código de redefinição de senha',
    html: `
      <h1>Roxyall Control</h1>
      <p>Seu código de redefinição de senha:</p>
      <h2>${realCode}</h2>
      <p>Se você não solicitou isso, ignore este email.</p>
    `,
    text: `Seu código de redefinição de senha: ${realCode}`,
  })
}