import { PrismaClient } from '@prisma/client'

import { getSeedData } from './data'

const client = new PrismaClient()

const deleteAllRecords = async () => {
  await client.query.deleteMany()
  await client.formData.deleteMany()

  console.log('All records deleted')
}

const createAllRecords = async () => {
  const data = await getSeedData()
  await client.formData.createMany({ data: data.formData })
  await client.query.createMany({ data: data.queries })

  console.log('All records created')
}

async function seed() {
  await deleteAllRecords()
  await createAllRecords()
}

seed()
  .then(async () => {
    await client.$disconnect()
    console.log('database disconnected')
    process.exit(0)
  })
  .catch(async e => {
    console.error(e)
    await client.$disconnect()
    process.exit(1)
  })
