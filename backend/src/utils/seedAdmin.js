const User = require('../models/User')

async function seedAdminUser() {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return
  }

  const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() })

  if (existing) {
    return
  }

  await User.create({
    name: ADMIN_NAME || 'Admin User',
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: 'admin',
  })

  console.log('Default admin user created.')
}

module.exports = { seedAdminUser }
