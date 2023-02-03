'use strict'

const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const { User } = require('../models/index')

module.exports = {
    async index(req, res) {
        try {
            const user = await User.findAll({
                attributes: { exclude: ['password'] }
            })
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({
                message: 'Error in the request'
            })
        }
    },

    async show(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (user !== null) res.status(200).json(user)
            else
                res.status(404).json({
                    message: 'No record found'
                })
        } catch (error) {
            res.status(500).json({
                message: 'Error in show user'
            })
        }
    },

    async create(req, res) {
        try {
            const data = req.body
            data.password = await bcrypt.hash(data.password, 10)
            await User.create(data)
            res.status(201).json({
                message: 'User created'
            })
        } catch (error) {
            res.status(500).json({
                message: 'Error in the request'
            })
        }
    },

    async update(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!user) {
                return res.status(400).json({
                    message: 'No record found'
                })
            }

            const data = req.body

            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10)
                await user.update(data)
                return res.status(200).json({
                    message: 'User updated'
                })
            }

            delete data.password
            await user.update(data)
            return res.status(200).json({
                message: 'User updated'
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
            const user = await User.findOne({
                where: {
                    [Op.and]: [{ id: req.params.id }, { id: { [Op.ne]: 1 } }]
                }
            })
            if (!user)
                return res.status(404).json({
                    message: 'No record found'
                })

            await user.destroy({
                where: {
                    id: req.params.id
                }
            })
            return res.status(200).json({
                message: 'User deleted'
            })
        } catch (error) {
            res.status(500).json({
                message: 'Error in the request'
            })
        }
    }
}
