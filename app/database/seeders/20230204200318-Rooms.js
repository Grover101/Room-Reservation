'use strict'
const faker = require('faker')
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Rooms', rooms)
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Snacks', null, {})
    }
}
const type = ['Individual', 'Couple', 'Family', 'matrimonial', 'Presidential']
const rooms = [...Array(10)].map(item => ({
    number: `${faker.datatype.number({ min: 1, max: 100 })}-H`,
    floor: faker.datatype.number({ min: 1, max: 10 }),
    description: faker.lorem.sentence(),
    price: faker.commerce.price(100, 200),
    state: 'Available',
    typeRoom: type[Math.round(Math.random() * type.length)],
    createdAt: new Date(),
    updatedAt: new Date()
}))
