const express = require('express')
const { check } = require('express-validator')
const router = express.Router()

// * VALIDATIONS
const { validateFields } = require('../middlewares/validateFields')

// * CONTROLLERS
const AuthController = require('../controllers/AuthController')
const { validateToken } = require('../middlewares/auth')
const { attributeExists } = require('../helpers/db-validates')

// * ROUTES
router.post(
    '/signUp',
    [
        check('ci', 'CI is required').not().isEmpty(),
        check('name', 'Name is required').not().isEmpty(),
        check('lastName', 'Name is required').not().isEmpty(),
        check('phone', 'Phone is required').not().isEmpty(),
        check('address', 'Address is required').not().isEmpty(),
        check('email', 'Email is required').trim().escape().not().isEmpty(),
        check('email', 'Email is invalid').isEmail(),
        check('email').custom(email =>
            attributeExists(email, 'email', 'Users')
        ),
        check('password', 'Password is required').isLength({ min: 6 }),
        validateFields
    ],
    AuthController.signUp
)
router.post(
    '/signIn',
    [
        check('email', 'Email is required').trim().escape().not().isEmpty(),
        check('password', 'Password is required').isLength({ min: 6 }),
        validateFields
    ],
    AuthController.signIn
)
router.post('/signOut', validateToken, AuthController.signOut)

module.exports = router
