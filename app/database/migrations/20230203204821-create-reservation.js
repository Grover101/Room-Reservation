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
                onDelete: 'SET NULL'
            },
            idUser: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'SET NULL',
                onDelete: 'SET NULL'
            },
            state: {
                type: Sequelize.ENUM('Pending', 'Paid', 'Deleted', 'Finalized'),
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
                type: Sequelize.STRING(20)
            },
            nitCi: {
                type: Sequelize.STRING(20)
            },
            amount: {
                type: Sequelize.DECIMAL(5, 2),
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
                type: Sequelize.STRING(15)
            },
            voucher: {
                type: Sequelize.STRING(50)
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
