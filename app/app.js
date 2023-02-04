'use strict'

const express = require('express')
const app = express()
const { sequelize } = require('./models/index')
const cors = require('cors')
const fileUpload = require('express-fileupload')

app.use(express.json({ limit: '10mb' }))
app.use(
    express.urlencoded({
        extended: false,
        limit: '10mb',
        parameterLimit: 500
    })
)
app.use(cors())
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true
    })
)

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
