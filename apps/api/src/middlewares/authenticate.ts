import jwt from 'jsonwebtoken';
import { FastifyReply, FastifyRequest } from "fastify";
import { env } from '../config/env';

interface DecodedToken {
    id: number;
    email: string;
    role: "ADMIN" | "USER";
}

export const authenticate = async (req: FastifyRequest, reply: FastifyReply) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return reply.code(401).send({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken;
        req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    } catch {
        return reply.code(401).send({ message: 'Token Inválido' });
    }
}