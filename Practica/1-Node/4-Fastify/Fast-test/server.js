// const fastify = require('fastify')({ logger: true })
import fast from 'fastify'
const fastify = fast({ logger: true })
import { itemRoutes } from './routes/items.js'
import fastifySwagger from 'fastify-swagger'

fastify.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
})
fastify.register(itemRoutes)

const PORT = 5000

const start = async () => {
  try {
    await fastify.listen(PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
