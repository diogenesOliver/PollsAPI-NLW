import { FastifyInstance } from "fastify"
import { prismaClientInstance } from '../../lib/prisma'
import { z } from 'zod'

function mappingOptions(options: string[]) {
    return options.map(option => {
        return {
            title: option
        }
    })
}

export async function createPoll(app: FastifyInstance) {
    app.post('/polls', async (request, reply) => {
        const createPollBody = z.object({
            title: z.string(),
            options: z.array(z.string())
        })

        const { title, options } = createPollBody.parse(request.body)
        const poll = await prismaClientInstance.poll.create({
            data: {
                title,
                options: {
                    createMany: {
                        data: mappingOptions(options)
                    }
                }
            }
        })

        return reply.status(201).send(poll)
    })
}

