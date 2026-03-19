const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      default: '',
    },
    crop: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    productCategory: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    productName: {
      type: String,
      trim: true,
      default: '',
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'processing', 'dispatched', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    trackingCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
)

orderSchema.index({ createdAt: -1, status: 1 })

module.exports = mongoose.model('Order', orderSchema)
