'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        static associate(models) {
            // define association here
        }
    }
    Room.init(
        {
            number: DataTypes.INTEGER,
            floor: DataTypes.INTEGER,
            description: DataTypes.STRING,
            price: DataTypes.DECIMAL,
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
