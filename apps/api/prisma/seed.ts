import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {

    const email = process.env.ADMIN_SEED_EMAIL || 'admin@roxyall.com'
    const password = process.env.ADMIN_SEED_PASSWORD || 'admin123'
    const name = process.env.ADMIN_SEED_NAME || 'Admin'

    const existing = await prisma.user.findUnique({
        where: { email: email }
    })

    if (existing) {
        console.log('Admin user already exists');
        return
    }

    
    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            role: 'ADMIN'
        }
    })

    console.log('Admin criado com sucesso!')
    console.log(`Email: ${email}`)
    console.log(`Senha: ${password}`)

}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })