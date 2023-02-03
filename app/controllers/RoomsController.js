'use strict'

const { Room } = require('../models/index')

module.exports = {
    async index(_req, res) {
        try {
            const room = await Room.findAll({
                where: { state: 'Available' },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })
            return res.status(200).json(room)
        } catch (error) {
            return res.status(500).json({
                message: 'Error in the request'
            })
        }
    },

    async show(req, res) {
        try {
            const room = await Room.findOne({
                where: {
                    id: req.params.id
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })
            if (!room)
                return res.status(404).json({
                    message: 'No record found'
                })

            return res.status(200).json(room)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Error in show room'
            })
        }
    },

    async create(req, res) {
        try {
            const data = req.body
            await Room.create(data)
            res.status(201).json({ message: 'Room Created' })
        } catch (error) {
            res.status(500).json({
                message: 'Error in the request'
            })
        }
    },

    async update(req, res) {
        try {
            const room = await Room.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!room) {
                return res.status(400).json({
                    message: `Room ${req.params.id} No record found`
                })
            }

            const data = req.body
            await room.update(data)
            return res.status(200).json({
                message: 'Room updated'
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
            const room = await Room.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!room)
                return res.status(404).json({
                    message: 'Room no record found'
                })

            await room.destroy({
                where: {
                    id: req.params.id
                }
            })
            return res.status(200).json({
                message: 'Room deleted'
            })
        } catch (error) {
            res.status(500).json({
                message: 'Error in the request'
            })
        }
    }
}
