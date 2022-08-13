function requireAuthentication(req, res, next) {
    const { user } = req.session
    if (!user) return res.status(401).json({ error: 'user unauthenticated, please login to chatMe.' })
    next()
}

module.exports = {
    requireAuthentication
}