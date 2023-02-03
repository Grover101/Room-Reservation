const express = require('express')
const { check, param } = require('express-validator')
const router = express.Router()

// * VALIDATIONS
const { validateToken, roleAccess } = require('../middlewares/auth')
const { validateFields } = require('../middlewares/validateFields')

// * CONTROLLERS
const UsersController = require('../controllers/UsersController')
const { attributeExists } = require('../helpers/db-validates')

// * ROUTES
router.get('/', [validateToken, roleAccess('admin')], UsersController.index)
router.get(
    '/:id',
    [
        validateToken,
        roleAccess('admin'),
        param('id', 'Invalid id is Number').notEmpty().isNumeric(),
        validateFields
    ],
    UsersController.show
)
router.post(
    '/',
    [
        validateToken,
        roleAccess('admin'),
        check('ci', 'CI is required').not().isEmpty(),
        check('name', 'Name is required').not().isEmpty(),
        check('lastName', 'Name is required').not().isEmpty(),
        check('phone', 'Phone is required').not().isEmpty(),
        check('address', 'Address is required').not().isEmpty(),
        check('gender', 'Gender is required').not().isEmpty(),
        check('gender', 'Gender invalid').isIn(['Male', 'Female', 'Other']),
        check('email', 'Email is required').trim().escape().not().isEmpty(),
        check('email', 'Email is invalid').isEmail(),
        check('ci').custom(ci => attributeExists(ci, 'ci', 'Users')),
        check('email').custom(email =>
            attributeExists(email, 'email', 'Users')
        ),
        check('password', 'Password is required').isLength({ min: 6 }),
        validateFields
    ],
    UsersController.create
)
router.put(
    '/:id',
    [
        validateToken,
        roleAccess('admin'),
        param('id', 'Invalid id is Number').notEmpty().isNumeric(),
        check('gender', 'Gender invalid')
            .optional()
            .isIn(['Male', 'Female', 'Other']),
        check('email', 'Email is invalid').isEmail(),
        check('ci').custom(ci => attributeExists(ci, 'ci', 'Users')),
        check('email').custom(email =>
            attributeExists(email, 'email', 'Users')
        ),
        check('password', 'Password is required')
            .optional()
            .isLength({ min: 6 }),
        validateFields
    ],
    UsersController.update
)
router.delete(
    '/:id',
    [
        validateToken,
        roleAccess('admin'),
        param('id', 'Invalid id is Number').notEmpty().isNumeric(),
        validateFields
    ],
    UsersController.delete
)

module.exports = router
