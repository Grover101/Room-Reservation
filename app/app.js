'use strict'

const express = require('express')
const app = express()
const { sequelize } = require('./models/index')
const cors = require('cors')

app.use(express.json({ limit: '50mb' }))
app.use(cors())

app.get('/api/v1', (_req, res) => {
    return res.json({ message: 'Hello World!!!' })
})

sequelize
    .sync()
    .then(() => {
        console.log('DB Connection Local')
    })
    .catch(error => {
        console.log('Failed to Connection DB Local\n', error)
    })

app.use('/api/v1', require('./routes/router'))

module.exports = app
