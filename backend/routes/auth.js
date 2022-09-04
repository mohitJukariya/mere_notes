const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator')

// Create a user using: POST "/api/auth/createuser" . NO LOGIN REQUIRED
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
      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })

      res.json(user)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Some error occured at create user part of the application')
    }
    //   .then(user => res.json(user))
    //   .catch(err => {console.log(err)
    // res.json({error: 'Please enter a unique value for email'})});
  },
)

module.exports = router
