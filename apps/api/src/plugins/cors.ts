import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

export const corsPlugin = async (app:FastifyInstance) => {
    app.register(cors, {
        origin: ['https://roxyall-control.vercel.app', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
    })
}