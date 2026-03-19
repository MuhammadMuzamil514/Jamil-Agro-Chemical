const mongoose = require('mongoose')

async function connectDB() {
  const { MONGO_URI } = process.env

  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not configured')
  }

  await mongoose.connect(MONGO_URI)
  console.log(`MongoDB connected: ${mongoose.connection.host}`)
}

module.exports = { connectDB }
