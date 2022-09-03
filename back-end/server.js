require('dotenv').config()
const express = require('express')
const path = require('path')
const expressSession = require('express-session')
const app = express()
const http = require('http').createServer(app)

const customCors = require('./middleware/cors')

const { connectSockets } = require('./services/socket.service')
const { connectToMongo } = require('./services/db.service')

const session = expressSession({
  secret: 'chatMe',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
})

app.use(express.json())
app.use(session)
app.use(customCors)

if (process.env.NODE_ENV === 'production') {
  // Express serve static files on production environment
  app.use(express.static(path.resolve(__dirname, 'public')))
}

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const chatRoutes = require('./api/chat/chat.routes')

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const startServer = async () => {
  await connectToMongo()
  connectSockets(http, session)

  const PORT = process.env.PORT || 3030
  http.listen(PORT, () => {
    console.log('server running on port:', PORT)
  })
}

startServer()
