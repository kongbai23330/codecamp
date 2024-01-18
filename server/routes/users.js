var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var User = require('../model/User')

/* GET users listing. */
router.post('/auth', async (req, res) => {
  const { email, password } = req.body
  let user = await User.findOne({ email: email })
  if (!user) {
    // Create a new user
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    user = await new User({
      email: email,
      password: hash,
    }).save()
  } else {
    // Check password for existing user
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: 'Authentication failed. Wrong password.' })
    }
  }
  // Create and send the token
  const payload = { user: { email: email } }
  jwt.sign(payload, 'codecamp2024', { expiresIn: '1h' }, (err, token) => {
    if (err) throw err
    res.json({ token })
  })
})

router.get('/verify', (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)
  jwt.verify(token, 'codecamp2024', (err, decoded) => {
    if (err) return res.sendStatus(403)
    res.json({ email: decoded.user.email })
  })
})

module.exports = router
