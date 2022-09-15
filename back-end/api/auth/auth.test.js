require('dotenv').config()
const {
  connectToMongo,
  closeMongoConnection,
} = require('../../services/db.service')
const authService = require('./auth.service')

const invalidUser = {
  username: 'no such user',
  password: '123456',
}

beforeAll(async () => {
  await connectToMongo()
})

afterAll(async () => {
  await closeMongoConnection()
})

test('should not login', async () => {
  const { username, password } = invalidUser
  try {
    const res = await authService.login(username, password)
  } catch (error) {
    expect(error).toBe('No such user')
  }
})
