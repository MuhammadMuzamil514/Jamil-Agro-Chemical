const nodemailer = require('nodemailer')
let twilioClient = null

function getMailer() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

function getTwilioClient() {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    return null
  }

  if (!twilioClient) {
    // Lazy load so the project works even when Twilio is not configured.
    // eslint-disable-next-line global-require
    const twilio = require('twilio')
    twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  }

  return twilioClient
}

async function sendOrderNotifications(order) {
  const tasks = []

  const mailer = getMailer()
  const {
    SMTP_FROM,
    SMTP_USER,
    ORDER_ALERT_EMAIL,
    TWILIO_PHONE_NUMBER,
    ORDER_ALERT_PHONE,
  } = process.env

  if (mailer && ORDER_ALERT_EMAIL) {
    const toAdmin = mailer.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: ORDER_ALERT_EMAIL,
      subject: `New Order Received: ${order.trackingCode}`,
      text: [
        `Tracking: ${order.trackingCode}`,
        `Client: ${order.clientName}`,
        `Phone: ${order.phone}`,
        `Crop: ${order.crop}`,
        `Category: ${order.productCategory}`,
        `Quantity: ${order.quantity}`,
        `Location: ${order.location}`,
      ].join('\n'),
    })
    tasks.push(toAdmin)

    if (order.email) {
      const toClient = mailer.sendMail({
        from: SMTP_FROM || SMTP_USER,
        to: order.email,
        subject: `Your Order is Received (${order.trackingCode})`,
        text: [
          `Dear ${order.clientName},`,
          '',
          `Your order has been received successfully.`,
          `Tracking ID: ${order.trackingCode}`,
          `Current Status: ${order.status}`,
          '',
          'Thank you for choosing Jamil Agro Chemicals.',
        ].join('\n'),
      })
      tasks.push(toClient)
    }
  }

  const client = getTwilioClient()
  if (client && TWILIO_PHONE_NUMBER && ORDER_ALERT_PHONE) {
    const adminSms = client.messages.create({
      from: TWILIO_PHONE_NUMBER,
      to: ORDER_ALERT_PHONE,
      body: `New JAC Order ${order.trackingCode} | ${order.clientName} | ${order.productCategory} | Qty ${order.quantity}`,
    })
    tasks.push(adminSms)

    if (order.phone) {
      const clientSms = client.messages.create({
        from: TWILIO_PHONE_NUMBER,
        to: order.phone,
        body: `Jamil Agro: your order ${order.trackingCode} is received. Current status: ${order.status}.`,
      })
      tasks.push(clientSms)
    }
  }

  if (tasks.length === 0) {
    return
  }

  await Promise.allSettled(tasks)
}

module.exports = {
  sendOrderNotifications,
}
