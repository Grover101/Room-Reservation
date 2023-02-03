const { sequelize } = require('../models/index')

const attributeExists = async (value = '', key = '', table = '') => {
    const query = await sequelize.query(
        `SELECT * FROM ${table} WHERE ${key} = '${value}' LIMIT 1`,
        { type: sequelize.QueryTypes.SELECT }
    )
    if (query.length > 0) throw new Error(`${key}: ${value}, already exists`)
}

module.exports = {
    attributeExists
}
