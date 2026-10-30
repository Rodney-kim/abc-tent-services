const express = require('express')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/admin')
const cors = require('cors')
require('dotenv').config()
const sendBookingEmail = require('./utils/mailer')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/admin', adminRoutes)
app.use('/api/gallery', require('./routes/gallery'))

app.get('/', (req, res) => {
  res.send('ABC Tent Services API is running')
})

app.post('/api/booking', async (req, res) => {
  try {
    await sendBookingEmail(req.body)
    res.status(200).json({ message: 'Booking request sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ message: 'Failed to send booking request' })
  }
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.error('MongoDB connection failed:', err.message))