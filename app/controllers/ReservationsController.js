'use strict'

const { Op } = require('sequelize')
const {
    upLoadImage,
    deleteImage,
    getImagePath
} = require('../helpers/upload-image')
const { Reservation, User, Room } = require('../models/index')

module.exports = {
    async index({ role, id, query }, res) {
        try {
            const option = {}
            const { state } = query
            if (state) option.where = { state }
            if (role === 'client')
                option.where = { ...option.where, idUser: id }

            const reservation = await Reservation.findAll({
                ...option,
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt']
                        }
                    },
                    {
                        model: Room,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                ],
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })
            res.status(200).json(reservation)
        } catch (error) {
            res.status(500).json({
                message: 'Error in the request'
            })
        }
    },

    async show(req, res) {
        try {
            const option = {}
            if (req.role === 'client') option.idUser = req.id
            console.log(option)
            const reservation = await Reservation.findOne({
                where: {
                    [Op.and]: [{ id: req.params.id }, option]
                },
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt']
                        }
                    },
                    {
                        model: Room,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                ]
            })
            if (reservation !== null) res.status(200).json(reservation)
            else
                res.status(404).json({
                    message: 'Reservation no record found'
                })
        } catch (error) {
            res.status(500).json({
                message: 'Error in show reservation'
            })
        }
    },

    async getVoucher(req, res) {
        try {
            const option = {}
            if (req.role === 'client') option.idUser = req.id
            const reservation = await Reservation.findOne({
                where: {
                    ...option,
                    id: req.params.id
                }
            })
            if (!reservation)
                return res.status(404).json({
                    message: 'No record found Reservation'
                })

            if (!reservation.voucher)
                return res.status(404).json({
                    message: 'No record found voucher'
                })

            const image = getImagePath(
                reservation.voucher,
                `reservation/voucher/${req.params.id}`
            )

            return res.status(200).json({ base: image })
        } catch (error) {
            res.status(500).json({
                message: 'Error in the request'
            })
        }
    },

    async create(req, res) {
        try {
            const data = req.body
            const dateInit = new Date(data.entryDate)
            if (!(dateInit > new Date()))
                return res.status(400).json({
                    field: 'entryDate',
                    message: 'Entry date cannot be passed'
                })
            const dateEnd = new Date(dateInit)
            dateEnd.setSeconds(dateInit.getSeconds() + data.cantDay * 86400)

            const reservations = await Reservation.findAll({
                where: {
                    [Op.and]: [
                        { idRoom: data.idRoom },
                        { state: { [Op.ne]: 'Finalized' } },
                        { state: { [Op.ne]: 'Deleted' } },
                        {
                            [Op.or]: [
                                {
                                    entryDate: {
                                        [Op.between]: [dateInit, dateEnd]
                                    }
                                },
                                {
                                    departureDate: {
                                        [Op.between]: [dateInit, dateEnd]
                                    }
                                }
                            ]
                        }
                    ]
                }
            })

            if (reservations.length)
                return res.status(400).json({
                    message: `Room ID ${data.idRoom} already reserved`
                })

            const room = await Room.findOne({
                where: { id: parseInt(data.idRoom) }
            })

            if (data.paymentMethod === 'Credit Card')
                if (!data.cardNumber)
                    return res.status(400).json({
                        field: 'cardNumber',
                        message: 'Card Number is required'
                    })

            const state = !(
                data.paymentMethod === 'Bank Transfer' ||
                data.paymentMethod === 'Bank Deposit'
            )
                ? 'Paid'
                : 'Pending'

            await Reservation.create({
                ...data,
                cardNumber:
                    data.paymentMethod === 'Credit Card'
                        ? data.cardNumber
                        : null,
                state,
                amount:
                    state === 'Paid'
                        ? parseFloat(room.price) * data.cantDay
                        : 0,
                departureDate: dateEnd,
                reservationDate: new Date()
            })

            return res.status(201).json({
                message: 'Reservation created'
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Error in the request'
            })
        }
    },

    async voucher(req, res) {
        try {
            const option = {}
            if (req.role === 'client') option.idUser = req.id
            const reservation = await Reservation.findOne({
                where: {
                    ...option,
                    id: req.params.id
                }
            })
            if (!reservation)
                return res.status(404).json({
                    message: 'No record found Reservation'
                })

            if (
                !(
                    reservation.paymentMethod === 'Bank Transfer' ||
                    reservation.paymentMethod === 'Bank Deposit'
                )
            )
                return res.status(403).json({
                    message: 'No need to add a voucher'
                })

            if (reservation.voucher)
                deleteImage(
                    reservation.voucher,
                    `reservation/voucher/${req.params.id}`
                )

            const nameFile = req.files
                ? await upLoadImage(
                      req.files,
                      `reservation/voucher/${req.params.id}`
                  )
                : null

            await reservation.update({ voucher: nameFile })
            return res.status(201).json({
                message: 'Voucher add'
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Error in the request'
            })
        }
    },

    async update(req, res) {
        try {
            const data = req.body
            let room
            const option = {}
            if (req.role === 'client') option.idUser = req.id
            const reservation = await Reservation.findOne({
                where: {
                    ...option,
                    id: req.params.id
                }
            })

            if (reservation.state === 'Pending') {
                const dateInit = new Date(data.entryDate)
                if (!(dateInit > new Date()))
                    return res.status(400).json({
                        field: 'entryDate',
                        message: 'Entry date cannot be passed'
                    })
                const dateEnd = new Date(dateInit)
                dateEnd.setSeconds(dateInit.getSeconds() + data.cantDay * 86400)

                const reservations = await Reservation.findAll({
                    where: {
                        idRoom: data.idRoom,
                        id: { [Op.ne]: req.params.id },
                        [Op.and]: [
                            { state: { [Op.ne]: 'Finalized' } },
                            { state: { [Op.ne]: 'Deleted' } }
                        ]
                    },
                    attributes: ['id', 'state', 'entryDate', 'departureDate']
                })

                const reserved = reservations.filter(
                    item =>
                        (dateInit >= item.entryDate &&
                            dateInit <= item.departureDate) ||
                        (dateEnd >= item.entryDate &&
                            dateEnd <= item.departureDate)
                )

                if (reserved.length)
                    return res.status(400).json({
                        message: `Room ID ${data.idRoom} already reserved`
                    })
                if (data.paymentMethod === 'Credit Card')
                    if (!data.cardNumber)
                        return res.status(400).json({
                            field: 'cardNumber',
                            message: 'Card Number is required'
                        })

                const state = !(
                    data.paymentMethod === 'Bank Transfer' ||
                    data.paymentMethod === 'Bank Deposit'
                )
                    ? 'Paid'
                    : 'Pending'

                await reservation.update({
                    idRoom: data.idRoom,
                    idUser: data.idUser,
                    paymentMethod: data.paymentMethod,
                    cardNumber:
                        data.paymentMethod === 'Credit Card'
                            ? data.cardNumber
                            : null,
                    state,
                    cantDay: data.cantDay,
                    amount:
                        state === 'Paid'
                            ? parseFloat(room.price) * data.cantDay
                            : 0,
                    departureDate: dateEnd,
                    entryDate: data.entryDate
                })

                return res.status(200).json({
                    message: 'Result Register updated'
                })
            }
            await reservation.update({
                detail: data.detail,
                billingName: data.billingName,
                nitCi: data.nitCi
            })

            return res.status(200).json({
                message: 'Result Register updated'
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Error in the request'
            })
        }
    },

    async validateTransfer(req, res) {
        try {
            const reservation = await Reservation.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (reservation.state === 'Deleted')
                return res.status(404).json({
                    message: 'Can not validate a deleted reservation'
                })

            if (!reservation.voucher)
                return res.status(404).json({
                    message: 'No exist Voucher'
                })

            if (
                !(
                    reservation.paymentMethod === 'Bank Transfer' ||
                    reservation.paymentMethod === 'Bank Deposit'
                )
            )
                return res.status(403).json({
                    message: 'No need to add a voucher'
                })

            const room = await Room.findOne({
                where: { id: parseInt(reservation.idRoom) }
            })

            await reservation.update({
                state: 'Paid',
                amount: parseFloat(room.price) * reservation.cantDay
            })

            return res.status(200).json({
                message: 'Validate Transfer Reservation'
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Error in the request'
            })
        }
    },

    async delete(req, res) {
        try {
            const option = {}
            if (req.role === 'client') option.idUser = req.id
            const reservation = await Reservation.findOne({
                where: {
                    ...option,
                    id: req.params.id
                }
            })

            if (!reservation)
                return res.status(404).json({
                    message: 'No record found'
                })

            await Room.update(
                { state: 'Available' },
                {
                    where: { id: parseInt(reservation.idRoom) }
                }
            )

            await reservation.update({ state: 'Deleted' })

            return res.status(200).json({
                message: 'Reservation deleted'
            })
        } catch (error) {
            res.status(500).json({
                message: 'Error in the request'
            })
        }
    },

    async deleteVoucher(req, res) {
        try {
            const option = {}
            if (req.role === 'client') option.idUser = req.id
            const reservation = await Reservation.findOne({
                where: {
                    ...option,
                    id: req.params.id
                }
            })

            if (!reservation)
                return res.status(404).json({
                    message: 'No record found Reservation'
                })

            if (!reservation.voucher)
                return res.status(404).json({
                    message: 'No record found voucher'
                })

            deleteImage(
                reservation.voucher,
                `reservation/voucher/${req.params.id}`
            )

            await Room.update(
                { state: 'Available' },
                {
                    where: { id: parseInt(reservation.idRoom) }
                }
            )

            await reservation.update({ voucher: null })

            return res.status(200).json({
                message: 'Voucher deleted'
            })
        } catch (error) {
            res.status(500).json({
                message: 'Error in the request'
            })
        }
    },
    async exit(req, res) {
        try {
            const reservation = await Reservation.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (reservation.state !== 'Finalized')
                return res.status(404).json({
                    message: 'Reservation not Paid '
                })

            await reservation.update({
                state: 'Finalized',
                departureDate: new Date()
            })

            return res.status(200).json({
                message: 'Reservation Finalizada'
            })
        } catch (error) {
            res.status(500).json({
                message: 'Error in the request'
            })
        }
    }
}
