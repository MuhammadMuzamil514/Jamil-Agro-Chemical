const jwt = require('jsonwebtoken')

function protect(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

  if (!token) {
    return res.status(401).json({ message: 'Not authorized. Missing token.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden. Admin access required.' })
    }

    req.user = decoded
    return next()
  } catch (_error) {
    return res.status(401).json({ message: 'Not authorized. Invalid token.' })
  }
}

module.exports = { protect }
