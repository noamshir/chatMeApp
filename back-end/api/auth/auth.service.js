const userService = require('../user/user.service')
const bcrypt = require('bcrypt')

async function login(username, password) {
  const user = await userService.getByUsername(username)
  if (!user) return Promise.reject('No such user')
  const match = await bcrypt.compare(password, user.password)
  if (!match) return Promise.reject('Wrong password')
  delete user.password
  return user
}

async function signUp(user) {
  const saltRounds = 10
  const existUser = await userService.getByUsername(user.username)
  if (existUser) {
    return Promise.reject('username taken')
  }
  const hash = await bcrypt.hash(user.password, saltRounds)
  user.password = hash
  const addedUser = await userService.add(user)
  delete addedUser.password
  return addedUser
}
module.exports = {
  login,
  signUp,
}
