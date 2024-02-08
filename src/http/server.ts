import fastify from 'fastify'
import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket'

import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'
import { voteOnPoll } from './routes/vote-on-poll'
import { pollResuts } from './ws/poll-results'

const app = fastify()
const PORT = 3333

app.register(cookie, {
    secret: "nlw-poll",
    hook: 'onRequest',
})

app.register(websocket)

//HTTP - Request
app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

//WebSocket - Request
app.register(pollResuts)

app.listen({ port: PORT }).then(() => {
    console.log('Server running on port: ' + PORT)
})