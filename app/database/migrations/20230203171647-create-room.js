'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Rooms', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            number: {
                type: Sequelize.STRING(5),
                unique: true,
                allowNull: false
            },
            floor: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            price: {
                type: Sequelize.DECIMAL(5, 2),
                allowNull: false
            },
            state: {
                type: Sequelize.ENUM('Available', 'Reserved', 'Mantenance'),
                default: 'Available'
            },
            typeRoom: {
                type: Sequelize.ENUM(
                    'Individual',
                    'Couple',
                    'Family',
                    'matrimonial',
                    'Presidential'
                )
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Rooms')
    }
}
