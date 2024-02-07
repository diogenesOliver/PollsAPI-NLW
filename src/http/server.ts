import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const app = fastify()
const PORT = 3333

const prismaClientInstance = new PrismaClient()

app.post('/polls', async (request, reply) => {
    const createPollBody = z.object({
        title: z.string()
    })

    const { title } = createPollBody.parse(request.body)
    const poll = await prismaClientInstance.poll.create({
        data: {
            title 
        }
    })

    return reply.status(201).send(poll)
})

app.listen({ port: PORT }).then(() => {
    console.log('Server running on port: ' + PORT)
})