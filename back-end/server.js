require('dotenv').config()
const express = require('express');
const cors = require('cors');
const path = require('path');
const expressSession = require('express-session');
const app = express();
const http = require('http').createServer(app);

const { connectSockets } = require('./services/socket.service');
const { connectToMongo } = require('./services/db.service')

const session = expressSession({
  secret: 'chatMe',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

app.use(express.json());
app.use(session);

if (process.env.NODE_ENV === 'production') {
  // Express serve static files on production environment
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  // Configuring CORS
  const corsOptions = {
    // Make sure origin contains the url your frontend is running on
    origin: [
      'http://127.0.0.1:8080',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const chatRoutes = require('./api/chat/chat.routes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);


app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const startServer = async () => {
  await connectToMongo()
  connectSockets(http, session);

  const PORT = process.env.PORT || 3030;
  http.listen(PORT, () => {
    console.log('server running on port:', PORT);
  });
}

startServer()
