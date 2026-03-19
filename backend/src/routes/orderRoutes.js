const express = require('express')
const rateLimit = require('express-rate-limit')
const {
  createOrder,
  trackOrderByCode,
  getOrders,
  updateOrderStatus,
} = require('../controllers/orderController')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

const orderSubmissionLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 8,
  message: { message: 'Too many order submissions. Please try again later.' },
})

const trackingLookupLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  message: { message: 'Too many tracking attempts. Please try again shortly.' },
})

router.post('/', orderSubmissionLimiter, createOrder)
router.get('/track/:trackingCode', trackingLookupLimiter, trackOrderByCode)
router.get('/', protect, getOrders)
router.patch('/:id/status', protect, updateOrderStatus)

module.exports = router
