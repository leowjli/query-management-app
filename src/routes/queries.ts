import { FastifyInstance } from 'fastify'
import prisma from '../db/db_client'

export default async function queriesRoutes(fastify: FastifyInstance) {
  // make a new query
  fastify.post('/queries', async (req, res) => {
    const { title, description, formDataId } = req.body as {
      title: string
      description?: string
      formDataId: string
    }

    const query = await prisma.query.create({
      data: {
        title,
        description,
        formDataId,
      },
      include: {
        formData: true,
      },
    })

    return query
  })

  // update existing query
  fastify.put('/queries/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const { status, description } = req.body as {
      status?: 'OPEN' | 'RESOLVED'
      description?: string
    }

    const query = await prisma.query.update({
      where: { id },
      data: {
        status,
        description,
      },
      include: {
        formData: true,
      },
    })

    return query
  })

  // delete a query
  fastify.delete('/queries/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    await prisma.query.delete({
      where: { id },
    })

    return { success: true }
  })
}
