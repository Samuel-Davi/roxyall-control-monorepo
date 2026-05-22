import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
    PORT: z.coerce.number().default(8080),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    GMAIL_USER: z.string().optional(),
    GMAIL_PASSWORD: z.string().optional(),
})

export const env = envSchema.parse(process.env);