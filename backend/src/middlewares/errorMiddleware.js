function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` })
}

function errorHandler(err, req, res, _next) {
  if (err && (err.name === 'ValidationError' || err.name === 'CastError')) {
    return res.status(400).json({
      message: err.message || 'Invalid request data',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
  }

  const statusCode = res.statusCode >= 400 ? res.statusCode : 500

  if (process.env.NODE_ENV !== 'production') {
    console.error(err)
  }

  res.status(statusCode).json({
    message: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = { notFound, errorHandler }
