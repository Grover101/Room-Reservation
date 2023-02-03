'use strict'

const bcrypt = require('bcrypt')
const { User } = require('../models/index')

module.exports = {
    async index(req, res) {
        try {
            let option = {
                order: [['id', 'ASC']]
            }
            option = req.query.active
                ? { where: { active: req.query.active === 'true' }, ...option }
                : option
            const user = await User.findAll(option)
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

            if (data.email) {
                const userEmail = await User.findOne({
                    where: {
                        email: data.email
                    }
                })

                if (userEmail) {
                    if (user.dataValues.email !== userEmail.email) {
                        return res.status(409).json({
                            message: 'Email already exists'
                        })
                    }
                }
            }

            if (data.username) {
                const userUsername = await User.findOne({
                    where: {
                        username: data.username
                    }
                })

                if (userUsername) {
                    if (user.dataValues.username !== userUsername.username) {
                        return res.status(409).json({
                            message: 'Username already exists'
                        })
                    }
                }
            }

            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10)
                await user.update(data)
                return res.status(200).json({
                    message: 'User updated'
                })
            } else {
                delete data.password
                await user.update(data)
            }
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
                    id: req.params.id
                }
            })
            if (user !== null) {
                if (user.id === 1)
                    return res.status(409).json({
                        message: 'You can not delete the admin user'
                    })
                await user.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                return res.status(200).json({
                    message: 'User deleted'
                })
            } else
                return res.status(404).json({
                    message: 'No record found'
                })
        } catch (error) {
            res.status(500).json({
                message: 'Error in the request'
            })
        }
    }
}
