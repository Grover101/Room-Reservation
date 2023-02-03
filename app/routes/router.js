const express = require('express')
const router = express.Router()

// * AUTH

// * User
router.use('/user', require('./users'))

// * Room
router.use('/room', require('./rooms'))

// * Reservation

module.exports = router
