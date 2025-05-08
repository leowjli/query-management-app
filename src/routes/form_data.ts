import { FastifyInstance } from 'fastify'
import prisma from '../db/db_client'
import { serializer } from './middleware/pre_serializer'
import { ICountedFormData } from './schemas/formData.interface'
import { ApiError } from '../errors'
import { getFormDataSchema } from './schemas/formData.schema';

async function formDataRoutes(app: FastifyInstance) {
  app.setReplySerializer(serializer)

  const log = app.log.child({ component: 'formDataRoutes' })

  app.get<{
    Reply: ICountedFormData
  }>('', {
    schema: getFormDataSchema,
    async handler(req, reply) {
      log.debug('get form data')
      try {
        const formData = await prisma.formData.findMany({
          include: {
            queries: true,
          },
        })
        reply.send({
          total: formData.length,
          formData,
        })
      } catch (err: any) {
        console.error('ERROR in GET /form-data:', err);
        log.error({ err }, err.message)
        throw new ApiError('failed to fetch form data', 400)
      }
    },
  })
}

export default formDataRoutes
