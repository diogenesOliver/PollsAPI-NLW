import { FastifyInstance } from "fastify"
import { prismaClientInstance } from '../../lib/prisma'
import { string, z } from 'zod'

export async function getPoll(app: FastifyInstance) {
    app.get('/polls/:pollId', async (request, reply) => {
        const getPollParams = z.object({
            pollId: string().uuid()
        })

        const { pollId } = getPollParams.parse(request.params)
        const poll = await prismaClientInstance.poll.findUnique({
            where: {
                id: pollId
            },
            include: {
                options: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        })

        return reply.status(200).send({ poll })
    })
}

