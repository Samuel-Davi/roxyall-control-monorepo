import "fastify";

type Role = "USER" | "ADMIN";
declare module "fastify" {
    interface FastifyRequest {
        user: {
            id: number;
            email: string;
            role: Role;
        }
    }
}