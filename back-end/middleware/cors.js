const cors = require('cors')

const customCors = (req, res, next) => {
  const whitelist = ['chatMeApp.com', 'http://localhost:3000']
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        const errorMsg = `Request was made from unauthorized domain: ${origin}`
        console.log(`Warning: ${errorMsg}`)
        return res.status(403).json({ error: errorMsg })
      }
    },
    credentials: true,
  }
  cors(corsOptions)(req, res, next)
}

module.exports = customCors
