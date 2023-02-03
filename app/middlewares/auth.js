const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { apiToken, User } = require('../models/index')

const validateToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'You do not have authorization, send a token'
        })
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        const tokenUser = await jwt.verify(
            token,
            process.env.SECRET_KEY,
            async (error, data) => {
                if (error) return { error: false, ...data }
                else return { error: true, ...data }
            }
        )

        if (tokenUser.error) {
            const user = await apiToken.findOne({
                where: {
                    idUser: tokenUser.id,
                    token
                }
            })

            if (!user)
                return res.status(403).send({ message: 'The Token is invalid' })

            req.userId = user.idUser
            return next()
        } else
            return res.status(403).send({
                message: 'Session expired, you do not have authorization'
            })
    } catch (e) {
        res.status(400).json({ message: 'Token is invalid' })
    }
}

const roleAccess = role => {
    return async (req, res, next) => {
        try {
            const roleUser = await User.findOne({
                where: {
                    [Op.and]: [{ id: req.userId }, { role }]
                }
            })

            if (roleUser) return next()
            return res.status(403).json({
                message: 'You do not have a role authorization'
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = { validateToken, roleAccess }
