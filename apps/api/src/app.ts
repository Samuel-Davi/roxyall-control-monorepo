import fastify from 'fastify'
import cookie from '@fastify/cookie'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { validatorCompiler, serializerCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { corsPlugin } from './plugins/cors'
import { authRoutes } from './modules/auth/auth.routes'
import { usersRoutes } from './modules/users/users.routes'
import { adminRoutes } from './modules/admin/admin.routes'
import { accountsRoutes } from './modules/accounts/accounts.routes'
import { cardsRoutes } from './modules/cards/cards.routes'

export function buildApp() {
  const app = fastify()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(corsPlugin)
  app.register(cookie, { hook: 'onRequest' })

  app.register(swagger, {
    openapi: {
      info: {
        title: 'Roxyall Control API',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    },
    transform: jsonSchemaTransform
  })

  app.register(swaggerUi, {
    routePrefix: '/docs',
  })

  app.get('/health', async (request, reply) => {
    return { status: 'ok', timestamp: new Date().toISOString() }
  })

  app.register(authRoutes, { prefix: '/auth' })
  app.register(usersRoutes, { prefix: '/users' })
  app.register(adminRoutes, { prefix: '/admin' })
  app.register(accountsRoutes, { prefix: '/accounts' })
  app.register(cardsRoutes, { prefix: '/cards' })

  return app
}