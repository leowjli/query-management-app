import build from './app'
import { FastifyInstance } from 'fastify'

const start = async () => {
  const server: FastifyInstance = await build({
    logger: {
      level: 'error',
    },
  })

  server
    .listen({ port: 8080, host: '0.0.0.0' })
    .then(address => {
      console.log(`Server listening at ${address}`)
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}

start()
  .then(() => {
    console.log('Server started successfully')
  })
  .catch(err => {
    console.error('Error starting server:', err)
    process.exit(1)
  })