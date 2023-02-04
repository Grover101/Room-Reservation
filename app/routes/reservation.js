const express = require('express')
const { check, param } = require('express-validator')
const router = express.Router()

// * VALIDATIONS
const {
    validateToken,
    rolePeticion,
    roleAccess
} = require('../middlewares/auth')
const { validateFields } = require('../middlewares/validateFields')

// * CONTROLLERS
const ReservationsController = require('../controllers/ReservationsController')
const { Exists, alreadyReserved } = require('../helpers/db-validates')

// * ROUTES

// TODO: obtener todas las reservas para admin
router.get('/', [validateToken, rolePeticion], ReservationsController.index)
// TODO: solo una reserva para admin
router.get(
    '/:id',
    [
        validateToken,
        rolePeticion,
        param('id', 'Invalid id is Number').notEmpty().isNumeric(),
        validateFields
    ],
    ReservationsController.show
)
// TODO: Obtener el comprobante
router.get(
    '/:id/voucher',
    [
        validateToken,
        rolePeticion,
        param('id', 'Invalid id is Number').notEmpty().isNumeric(),
        param('id').custom(id => Exists(id, 'id', 'Reservations')),
        validateFields
    ],
    ReservationsController.getVoucher
)
// TODO: Crear Reserva con usuario existente por admin
router.post(
    '/',
    [
        validateToken,
        rolePeticion,
        check('detail', 'Detail is required').notEmpty(),
        check('cantDay', 'Number of day is required').notEmpty(),
        check('entryDate', 'Entry Date is required').notEmpty(),
        check('paymentMethod', 'Payment Method is required').notEmpty(),
        check('cardNumber').optional(),
        check('cantDay', 'Number of day is Integer').isInt(),
        // check('amount', 'Amount is Decimal').isDecimal(),
        check('idRoom', 'ID Room is required').notEmpty(),
        check('idUser', 'ID User is required').notEmpty(),
        check('idRoom').custom(idRoom => Exists(idRoom, 'id', 'Rooms')),
        check('idRoom').custom(idRoom => alreadyReserved(idRoom)),
        check('idUser').custom(idUser => Exists(idUser, 'id', 'Users')),
        check('paymentMethod', 'Payment Method invalid').isIn([
            'Bank Transfer',
            'Bank Deposit',
            'Cash',
            'Credit Card'
        ]),
        validateFields
    ],
    ReservationsController.create
)
// TODO: agregar comprobante en caso de Bank tranfer o Bank Deposit
router.put(
    '/:id/voucher',
    [
        validateToken,
        rolePeticion,
        param('id', 'Invalid id is Number').notEmpty().isNumeric(),
        param('id').custom(id => Exists(id, 'id', 'Reservations')),
        validateFields
    ],
    ReservationsController.voucher
)
// TODO: Actualizar reserva por admin
router.put(
    '/:id',
    [
        validateToken,
        rolePeticion,
        param('id', 'Invalid id is Number').notEmpty().isNumeric(),
        param('id').custom(id => Exists(id, 'id', 'Reservations')),
        check('idRoom').custom(idRoom => Exists(idRoom, 'id', 'Rooms')),
        check('idRoom').custom(idRoom => alreadyReserved(idRoom)),
        check('idUser').custom(idUser => Exists(idUser, 'id', 'Users')),
        check('paymentMethod', 'Payment Method invalid').isIn([
            'Bank Transfer',
            'Bank Deposit',
            'Cash',
            'Credit Card'
        ]),
        validateFields
    ],
    ReservationsController.update
)
// TODO: eliminar una reserva admin
router.delete(
    '/:id',
    [
        validateToken,
        rolePeticion,
        param('id', 'Invalid id is Number').notEmpty().isNumeric(),
        param('id').custom(id => Exists(id, 'id', 'Reservations')),
        validateFields
    ],
    ReservationsController.delete
)
// TODO: eliminar una voucher
router.delete(
    '/:id/voucher',
    [
        validateToken,
        rolePeticion,
        param('id', 'Invalid id is Number').notEmpty().isNumeric(),
        param('id').custom(id => Exists(id, 'id', 'Reservations')),
        validateFields
    ],
    ReservationsController.deleteVoucher
)
// TODO: validad Despoist or Transfer
router.put(
    '/:id/validate',
    [
        validateToken,
        roleAccess('admin'),
        param('id', 'Invalid id is Number').notEmpty().isNumeric(),
        param('id').custom(id => Exists(id, 'id', 'Reservations')),
        validateFields
    ],
    ReservationsController.validateTransfer
)
// TODO: salida del cliente
router.put(
    '/:id/exit',
    [
        validateToken,
        roleAccess('admin'),
        param('id', 'Invalid id is Number').notEmpty().isNumeric(),
        param('id').custom(id => Exists(id, 'id', 'Reservations')),
        validateFields
    ],
    ReservationsController.exit
)

module.exports = router
