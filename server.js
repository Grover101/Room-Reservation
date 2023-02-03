'use strict'

const app = require('./app/app')
require('dotenv').config()

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(
        `Server is running on port http://${process.env.HOST}:${process.env.PORT}`
    )
})
