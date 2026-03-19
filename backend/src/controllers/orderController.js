const Order = require('../models/Order')
const { sendOrderNotifications } = require('../utils/notificationService')

function createTrackingCode() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  return `JAC-${datePart}-${random}`
}

async function createOrder(req, res, next) {
  try {
    const {
      clientName,
      phone,
      email,
      crop,
      productCategory,
      productName,
      quantity,
      location,
      message,
    } = req.body

    if (!clientName || !phone || !crop || !productCategory || !quantity || !location) {
      return res.status(400).json({ message: 'Missing required fields for order.' })
    }

    const trackingCode = createTrackingCode()

    const order = await Order.create({
      clientName,
      phone,
      email,
      crop,
      productCategory,
      productName,
      quantity,
      location,
      message,
      trackingCode,
    })

    // Notifications are best-effort and should not block order creation flow.
    sendOrderNotifications(order).catch((notifyErr) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Order notification error:', notifyErr.message)
      }
    })

    return res.status(201).json({
      message: 'Order submitted successfully.',
      data: {
        id: order._id,
        trackingCode: order.trackingCode,
        status: order.status,
      },
    })
  } catch (error) {
    return next(error)
  }
}

async function trackOrderByCode(req, res, next) {
  try {
    const trackingCode = String(req.params.trackingCode || '').trim().toUpperCase()

    if (!trackingCode) {
      return res.status(400).json({ message: 'Tracking code is required.' })
    }

    const order = await Order.findOne({ trackingCode }).select(
      'trackingCode status crop productCategory productName quantity createdAt updatedAt',
    )

    if (!order) {
      return res.status(404).json({ message: 'Order not found for this tracking code.' })
    }

    return res.status(200).json({ data: order })
  } catch (error) {
    return next(error)
  }
}

async function getOrders(req, res, next) {
  try {
    const { status } = req.query
    const filter = status ? { status } : {}

    const orders = await Order.find(filter).sort({ createdAt: -1 })
    return res.status(200).json({ data: orders })
  } catch (error) {
    return next(error)
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params
    const { status } = req.body

    const allowed = new Set(['pending', 'approved', 'processing', 'dispatched', 'completed', 'cancelled'])
    if (!allowed.has(status)) {
      return res.status(400).json({ message: 'Invalid order status.' })
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    )

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' })
    }

    return res.status(200).json({ message: 'Order status updated.', data: order })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  createOrder,
  trackOrderByCode,
  getOrders,
  updateOrderStatus,
}
