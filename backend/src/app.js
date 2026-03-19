const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const plannerRoutes = require('./routes/plannerRoutes')
const orderRoutes = require('./routes/orderRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(helmet())
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : '*',
    credentials: false,
  }),
)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { message: 'Too many requests from this IP, please try later.' },
  }),
)
app.use(morgan('combined'))
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/planner-config', plannerRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
