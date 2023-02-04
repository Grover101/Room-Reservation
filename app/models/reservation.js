'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Reservation extends Model {
        static associate(models) {
            this.belongsTo(models.Room, {
                foreignKey: 'idRoom'
            })

            this.belongsTo(models.User, {
                foreignKey: 'idUser'
            })
        }
    }
    Reservation.init(
        {
            idRoom: DataTypes.INTEGER,
            idUser: DataTypes.INTEGER,
            state: DataTypes.ENUM('Pending', 'Paid', 'Deleted', 'Finalized'),
            detail: DataTypes.STRING,
            cantDay: DataTypes.INTEGER,
            billingName: DataTypes.STRING,
            nitCi: DataTypes.STRING,
            amount: DataTypes.DECIMAL(5, 2),
            paymentMethod: DataTypes.ENUM(
                'Bank Transfer',
                'Bank Deposit',
                'Cash',
                'Credit Card'
            ),
            cardNumber: DataTypes.STRING,
            voucher: DataTypes.STRING,
            reservationDate: DataTypes.DATE,
            entryDate: DataTypes.DATE,
            departureDate: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'Reservation'
        }
    )
    return Reservation
}
