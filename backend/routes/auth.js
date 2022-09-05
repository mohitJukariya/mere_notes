const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const { Router } = require('express')
var fetchuser = require('../middleware/fetchUser')


const JWT_SECRET = 'mohitisagoodb$oy'

// ROUTE:1 Create a user using: POST "/api/auth/createuser" . NO LOGIN REQUIRED
router.post(
  '/createuser',
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be 5 characters long').isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Check wheather the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        return res
          .status(400)
          .json({ error: 'Sorry a user with this email already exists' })
      }

      const salt = await bcrypt.genSalt(10)
      const secPass = bcrypt.hashSync(req.body.password, salt)
      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

      const data = {
        user: {
          id: user.id,
        },
      }
      const authToken = jwt.sign(data, JWT_SECRET)

      res.json({ authToken })
    } catch (error) {
      console.error(error.message)
      res
        .status(500)
        .send('Some error occured at create user part of the application')
    }
    //   .then(user => res.json(user))
    //   .catch(err => {console.log(err)
    // res.json({error: 'Please enter a unique value for email'})});
  },
)

// ROUTE:2 Authenticate a User using: POST "/api/auth/login" . NO LOGIN REQUIRED
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res
          .status(400)
          .json({ error: 'Please try to login with the correct credentials' })
      }
      const passwordCompare = await bcrypt.compare(password, user.password)
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: 'Please try to login with the correct credentials' })
      }

      const data = {
        user: {
          id: user.id,
        },
      }
      const authToken = jwt.sign(data, JWT_SECRET)

      res.json({ authToken })
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Internal server occured')
    }
  },
)

// ROUTE:3 Get loggedin USer Details using "/api/auth/getuser" . LOGIN REQUIRED

router.post('/getuser',fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select('-password')
    res.send(user);
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal server occured')
  }

})

module.exports = router
