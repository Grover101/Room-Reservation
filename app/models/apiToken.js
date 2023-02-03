'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class apiToken extends Model {
        static associate(models) {
            apiToken.belongsTo(models.User, {
                foreignKey: 'idUser'
            })
        }
    }
    apiToken.init(
        {
            idUser: DataTypes.INTEGER,
            token: DataTypes.STRING,
            expire: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'apiToken'
        }
    )
    return apiToken
}
