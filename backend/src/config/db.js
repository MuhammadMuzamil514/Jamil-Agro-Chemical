const mongoose = require('mongoose')

async function connectDB() {
  const { MONGO_URI } = process.env
  const connectTimeoutMs = 20000

  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not configured')
  }

  try {
    await Promise.race([
      mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 15000,
        family: 4,
      }),
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error(`MongoDB connection timeout after ${connectTimeoutMs}ms`))
        }, connectTimeoutMs)
      }),
    ])
    console.log(`MongoDB connected: ${mongoose.connection.host}`)
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    throw error
  }
}

module.exports = { connectDB }
