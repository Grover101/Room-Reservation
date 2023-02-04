const { Op } = require('sequelize')
const { sequelize, Room } = require('../models/index')

const attributeExists = async (
    value = '',
    key = '',
    table = '',
    messageError = ''
) => {
    const query = await sequelize.query(
        `SELECT * FROM ${table} WHERE ${key} = '${value}' LIMIT 1`,
        { type: sequelize.QueryTypes.SELECT }
    )
    if (query.length > 0)
        throw new Error(
            messageError.length
                ? messageError
                : `${key}: ${value}, already exists`
        )
}

const alreadyReserved = async (id = '') => {
    const query = await Room.findOne({
        where: {
            [Op.and]: [
                { id },
                { [Op.or]: [{ state: 'Reserved' }, { state: 'Mantenance' }] }
            ]
        }
    })
    if (query) throw new Error(`Room ID ${id} already reserved`)
}

const Exists = async (value = '', key = '', table = '') => {
    const query = await sequelize.query(
        `SELECT * FROM ${table} WHERE ${key} = '${value}' LIMIT 1`,
        { type: sequelize.QueryTypes.SELECT }
    )
    if (query.length <= 0) throw new Error(`${key}: ${value}, not exists`)
}

const dateValidated = entryDate => {
    const dateInit = new Date(entryDate)
    if (!(dateInit > new Date())) throw new Error(`Entry date cannot be passed`)
}

module.exports = {
    attributeExists,
    Exists,
    alreadyReserved,
    dateValidated
}
