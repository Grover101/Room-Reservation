'use strict'

const { User, apiToken } = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    async signUp({ body }, res) {
        try {
            body.password = await bcrypt.hash(body.password, 10)
            const user = await User.create(body)
            const tokenUser = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.SECRET_KEY,
                {
                    expiresIn: '4h'
                }
            )
            await apiToken.create({
                idUser: user.id,
                token: tokenUser,
                expire: new Date(Date.now() + 4 * 60 * 60 * 1000)
            })
            return res.status(201).json({
                token: tokenUser,
                user: user.name,
                message: 'User Register'
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Error in the request'
            })
        }
    },

    async signIn({ body }, res) {
        try {
            const userConsult = await User.findOne({
                where: {
                    email: body.email
                },
                attributes: ['id', 'email', 'password', 'role']
            })
            if (!userConsult)
                return res.status(403).json({
                    message: 'Email or Password invalid'
                })

            const match = await bcrypt.compare(
                body.password,
                userConsult.password
            )

            if (!match)
                return res.status(403).json({
                    message: 'Email or Password invalid'
                })

            const tokenUser = jwt.sign(
                {
                    id: userConsult.id,
                    email: userConsult.email
                },
                process.env.SECRET_KEY,
                { expiresIn: '4h' }
            )
            await apiToken.create({
                idUser: userConsult.id,
                token: tokenUser,
                expire: new Date(Date.now() + 4 * 60 * 60 * 1000)
            })

            return res.status(200).json({
                idUser: userConsult.id,
                token: tokenUser,
                email: userConsult.email,
                role: userConsult.role,
                message: 'User logged'
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Error in the request' })
        }
    },

    async signOut({ body }, res) {
        try {
            await apiToken.destroy({
                where: {
                    idUser: body.id,
                    token: body.token
                }
            })
            return res.status(200).json({
                message: 'Logout completed'
            })
        } catch (error) {
            console.log('error: ', error)
            return res.status(500).json({
                message: 'Error in the logout'
            })
        }
    }
}
