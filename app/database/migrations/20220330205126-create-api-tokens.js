'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('apiTokens', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idUser: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'RESTRICT',
                onDelete: 'CASCADE'
            },
            token: {
                type: Sequelize.STRING(255)
            },
            expire: {
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
        await queryInterface.dropTable('apiTokens')
    }
}
