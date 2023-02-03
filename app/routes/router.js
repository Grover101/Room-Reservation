const express = require('express')
const router = express.Router()

// * AUTH
router.use(require('./auth'))

// * User
router.use('/user', require('./users'))

// * Room
router.use('/room', require('./rooms'))

// * Reservation

module.exports = router
