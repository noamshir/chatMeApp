const userService = require('./user.service')

async function getUsers(req, res) {
  try {
    const { user } = req.session
    const userId = user._id
    const users = await userService.query(userId)
    res.send(users)
  } catch (err) {
    res.status(500).send('cant retrieve users')
  }
}

async function updateUser(req, res) {
  const user = req.body
  try {
    const updatedUser = await userService.update(user)
    req.session.user = updatedUser
    res.send(updatedUser)
  } catch (error) {
    res.status(500).send('cant update user')
  }
}

module.exports = { getUsers, updateUser }
