const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/login', (req, res) => {
  const { password } = req.body ?? {}

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Wrong password' })
  }

  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
  res.json({ token })
})

// quick test route: only works with a valid token
router.get('/check', require('../middleware/auth'), (req, res) => {
  res.json({ message: 'You are logged in as admin' })
})

module.exports = router