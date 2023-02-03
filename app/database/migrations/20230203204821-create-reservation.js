'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Reservations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idRoom: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Rooms',
                    key: 'id'
                },
                onUpdate: 'SET NULL',
                onDelete: 'SET NULL',
                allowNull: false
            },
            idUser: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'SET NULL',
                onDelete: 'SET NULL',
                allowNull: false
            },
            state: {
                type: Sequelize.ENUM('Pending', 'Paid', 'Deleted'),
                defaultValue: 'Pending',
                allowNull: false
            },
            detail: {
                type: Sequelize.STRING
            },
            cantDay: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            billingName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nitCi: {
                type: Sequelize.STRING,
                allowNull: false
            },
            amount: {
                type: Sequelize.DECIMAL,
                allowNull: false
            },
            paymentMethod: {
                type: Sequelize.ENUM(
                    'Bank Transfer',
                    'Bank Deposit',
                    'Cash',
                    'Credit Card'
                ),
                allowNull: false
            },
            cardNumber: {
                type: Sequelize.INTEGER
            },
            voucher: {
                type: Sequelize.STRING
            },
            reservationDate: {
                type: Sequelize.DATE
            },
            entryDate: {
                type: Sequelize.DATE
            },
            departureDate: {
                type: Sequelize.DATE
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
        await queryInterface.dropTable('Reservations')
    }
}
