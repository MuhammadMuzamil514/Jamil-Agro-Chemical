require('dotenv').config()
const app = require('./app')
const { connectDB } = require('./config/db')
const { seedAdminUser } = require('./utils/seedAdmin')

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    console.log('Starting backend server...')
    console.log('Connecting to MongoDB Atlas...')
    await connectDB()
    console.log('Seeding admin user if needed...')
    await seedAdminUser()
    console.log(`Starting HTTP server on port ${PORT}...`)

    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Unable to start server:', error.message)
    process.exit(1)
  }
}

startServer()
