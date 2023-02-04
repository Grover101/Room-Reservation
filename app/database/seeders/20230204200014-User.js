'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [
            {
                ci: '123456789CH',
                name: 'Admin',
                lastName: 'Demo',
                gender: 'Male',
                phone: '75314812',
                address: 'Calle Bolivar #12',
                role: 'Admin',
                email: 'admin@gmail.com',
                password:
                    '$2b$10$mKifv6cGQ/AZKDpYt8nK7e9jFFIRYDvdpUxvjuEZC4GHVE1Er9MZC',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                ci: '12345671CH',
                name: 'User',
                lastName: 'Demo',
                gender: 'Male',
                phone: '75314812',
                address: 'Calle Bolivar #12',
                role: 'client',
                email: 'user@gmail.com',
                password:
                    '$2b$10$mKifv6cGQ/AZKDpYt8nK7e9jFFIRYDvdpUxvjuEZC4GHVE1Er9MZC',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {})
    }
}
