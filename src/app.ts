import fastify from 'fastify'
import cors from '@fastify/cors'
import formDataRoutes from './routes/form_data'
import queriesRoutes from './routes/queries'
import errorHandler from './errors'

async function build(opts = {}) {
  const app = fastify(opts)

  // register cors before to aviod preflight errors
  await app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })

  app.register(formDataRoutes, { prefix: '/form-data' })
  app.register(queriesRoutes)

  app.setErrorHandler(errorHandler)

  return app
}
export default build
