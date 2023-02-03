'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            ci: {
                type: Sequelize.STRING(15)
            },
            name: {
                type: Sequelize.STRING(20)
            },
            lastName: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            address: {
                type: Sequelize.STRING(20)
            },
            phone: {
                type: Sequelize.STRING(10)
            },
            email: {
                type: Sequelize.STRING(40),
                unique: true
            },
            password: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.ENUM('admin', 'client'),
                defaultValue: 'client'
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
        await queryInterface.dropTable('Users')
    }
}
