'use strict'

const Sequelize = require('sequelize')
const config = require('../config/database')
const mysql2 = require('mysql2')

const db = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    dialectModule: mysql2,
    logging: false
})

module.exports = db
