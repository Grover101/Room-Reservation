'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        static associate(models) {
            this.hasMany(models.Reservation, {
                foreignKey: 'idRoom'
            })
        }
    }
    Room.init(
        {
            number: DataTypes.INTEGER,
            floor: DataTypes.INTEGER,
            description: DataTypes.STRING,
            price: DataTypes.DECIMAL(5, 2),
            state: DataTypes.ENUM('Available', 'Reserved', 'Mantenance'),
            typeRoom: DataTypes.ENUM(
                'Individual',
                'Couple',
                'Family',
                'matrimonial',
                'Presidential'
            )
        },
        {
            sequelize,
            modelName: 'Room'
        }
    )
    return Room
}
