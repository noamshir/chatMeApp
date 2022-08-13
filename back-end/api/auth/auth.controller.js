const authService = require('./auth.service');

async function login(req, res) {
  let user = req.body;
  const { username, password } = user;
  try {
    const loggedUser = await authService.login(username, password);
    if (!loggedUser) return res.status(401).send({ err: 'Failed to Login' });
    req.session.user = loggedUser;
    res.json(loggedUser);
  } catch (err) {
    res.status(500).send({ err: 'Error while login' });
  }
}

async function signUp(req, res) {
  var newUser = req.body;
  try {
    const user = await authService.signUp(newUser);
    req.session.user = user;
    res.json(user);
  } catch (err) {
    res.status(500).send({ err: 'Failed to signup' });
  }
}

async function logOut(req, res) {
  try {
    req.session.destroy();
    res.send('logged out successfully!');
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' });
  }
}

module.exports = {
  login,
  signUp,
  logOut,
};
