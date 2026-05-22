import jwt from 'jsonwebtoken';
import { FastifyReply, FastifyRequest } from "fastify";
import { env } from '../config/env';

interface DecodedToken {
    id: number;
    email: string;
}

export const authenticate = async (req: FastifyRequest, res: FastifyReply) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken;
        req.user = decoded;
    } catch {
        return res.status(401).send({ message: 'Token Inválido' });
    }
}