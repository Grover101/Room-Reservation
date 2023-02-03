'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            this.hasMany(models.Reservation, {
                foreignKey: 'idUser'
            })
        }
    }
    User.init(
        {
            active: DataTypes.BOOLEAN,
            ci: DataTypes.INTEGER,
            name: DataTypes.STRING,
            lastName: DataTypes.STRING,
            phone: DataTypes.STRING,
            address: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.ENUM('admin', 'client')
        },
        {
            sequelize,
            modelName: 'User'
        }
    )
    return User
}
