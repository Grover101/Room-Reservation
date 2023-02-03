require('dotenv').config()

module.exports = {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || null,
    database: process.env.MYSQL_DB_NAME || 'room-reservation',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || '3306',
    dialect: process.env.DIALECT || 'mysql'
}
