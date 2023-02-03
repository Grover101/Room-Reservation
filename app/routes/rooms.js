const express = require('express')
const { check, param } = require('express-validator')
const router = express.Router()

// * VALIDATIONS
const { validateToken, roleAccess } = require('../middlewares/auth')
const { validateFields } = require('../middlewares/validateFields')

// * CONTROLLERS
const RoomsController = require('../controllers/RoomsController')

router.get('/', [validateToken], RoomsController.index)
router.get(
    '/:id',
    [
        validateToken,
        param('id', 'Invalid id is Number').notEmpty().isNumeric(),
        validateFields
    ],
    RoomsController.show
)
router.post(
    '/',
    [
        validateToken,
        roleAccess('admin'),
        check('number', 'Number is required').not().isEmpty(),
        check('floor', 'Floor is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('price', 'Price is required').not().isEmpty(),
        check('state', 'State is required').not().isEmpty(),
        check('typeRoom', 'Type Rom is required').not().isEmpty(),
        check('floor', 'Floor is Integer').isInt(),
        check('price', 'Price is Decimal').isDecimal(),
        check('state', 'State invalid').isIn([
            'Available',
            'Reserved',
            'Mantenance'
        ]),
        check('typeRoom', 'Type Room invalid').isIn([
            'Individual',
            'Couple',
            'Family',
            'matrimonial',
            'Presidential'
        ]),
        validateFields
    ],
    RoomsController.create
)

router.put(
    '/:id',
    [
        validateToken,
        roleAccess('admin'),
        param('id', 'Invalid id is Number').notEmpty().isNumeric(),
        check('floor', 'Floor is Integer').isInt(),
        check('price', 'Price is Decimal').isDecimal(),
        check('state', 'State invalid').isIn([
            'Available',
            'Reserved',
            'Mantenance'
        ]),
        check('typeRoom', 'Type Room invalid').isIn([
            'Individual',
            'Couple',
            'Family',
            'matrimonial',
            'Presidential'
        ]),
        validateFields
    ],
    RoomsController.update
)

router.delete(
    '/:id',
    [
        validateToken,
        roleAccess('admin'),
        param('id', 'Invalid id is Number').notEmpty().isNumeric(),
        validateFields
    ],
    RoomsController.delete
)

module.exports = router