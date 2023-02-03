const express = require('express')
const router = express.Router()

// * AUTH

// * User
router.use('/user', require('./users'))

// * Room

// * Reservation

module.exports = router
