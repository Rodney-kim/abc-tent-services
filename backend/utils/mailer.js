const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const sendBookingEmail = async (bookingData) => {
  const { name, phone, eventDate, details } = bookingData

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // sends to yourself (the business owner)
    subject: `New Booking Request from ${name}`,
    text: `
New booking request received:

Name: ${name}
Phone: ${phone}
Event Date: ${eventDate}
Details: ${details}
    `,
  }

  await transporter.sendMail(mailOptions)
}

module.exports = sendBookingEmail