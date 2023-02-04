'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Reservations', [
            {
                idRoom: 2,
                idUser: 2,
                state: 'Finalized',
                detail: 'Reserva realizada sin ningun problema',
                cantDay: 3,
                billingName: '',
                nitCi: '',
                amount: '36.60',
                paymentMethod: 'Credit Card',
                cardNumber: '123456789',
                voucher: null,
                reservationDate: new Date('2023-02-04T18:39:23.000Z'),
                entryDate: new Date('2023-02-05T00:00:00.000Z'),
                departureDate: new Date('2023-02-04T20:26:19.000Z'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idRoom: 2,
                idUser: 2,
                state: 'Paid',
                detail: 'Reserva realizada sin ningun problema',
                cantDay: 5,
                billingName: '',
                nitCi: '',
                amount: '61.00',
                paymentMethod: 'Credit Card',
                cardNumber: '123456789',
                voucher: null,
                reservationDate: new Date('2023-02-04T18:48:16.000Z'),
                entryDate: new Date('2023-02-09T00:00:00.000Z'),
                departureDate: new Date('2023-02-14T00:00:00.000Z'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idRoom: 2,
                idUser: 2,
                state: 'Pending',
                detail: 'Reserva realizada sin ningun problema',
                cantDay: 1,
                billingName: '',
                nitCi: '',
                amount: '0.00',
                paymentMethod: 'Bank Transfer',
                cardNumber: null,
                voucher: 'cb130a67-fd1a-4be1-930f-a8f78943ba8a.jpg',
                reservationDate: new Date('2023-02-04T19:15:06.000Z'),
                entryDate: new Date('2023-02-15T00:00:00.000Z'),
                departureDate: new Date('2023-02-16T00:00:00.000Z'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idRoom: 1,
                idUser: 2,
                state: 'Deleted',
                detail: 'Reserva realizada sin ningun problema',
                cantDay: 5,
                billingName: '',
                nitCi: '',
                amount: '0.00',
                paymentMethod: 'Bank Transfer',
                cardNumber: null,
                voucher: null,
                reservationDate: new Date('2023-02-04T19:03:25.000Z'),
                entryDate: new Date('2023-02-11T00:00:00.000Z'),
                departureDate: new Date('2023-02-16T00:00:00.000Z'),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Reservarions', null, {})
    }
}
