import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

import routes from './router/routes'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const port = 3001

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(routes)

io.on('connection', (socket) => {
  console.log('A user connected')
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

app.listen(port, () => {
  console.log('server running on port 3001')
})
