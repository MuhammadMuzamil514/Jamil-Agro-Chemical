require('dotenv').config()
const app = require('./app')
const { connectDB } = require('./config/db')
const { seedAdminUser } = require('./utils/seedAdmin')

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    await connectDB()
    await seedAdminUser()

    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Unable to start server:', error.message)
    process.exit(1)
  }
}

startServer()
