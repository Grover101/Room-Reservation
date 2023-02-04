# Room-Reservation

## Descripcion de la API

La API REST Reservas de Habitaciones es una API REST que permite la reserva de habitaciones, registro de usuario y creacion de habitaciones.
Para los pago se esta tomando como pago unico al momento de reserva.
Se esta usando un ORM para el manejo de base de datos `Sequelize`.
Existe dos usuarios `admin` y `client`:

> admin
> email: admin@gmail.com
> password: 123456

> client
> email: user@gmail.com
> password: 123456

## Comandos de Ejecucion

Crear el Contenedor

> `docker compose up -d`

Agregar Seeders a la base de datos

> `docker exec -i Room-Reservation yarn db`

## Headers

Cada peticion debe tener los siguientes headers:

    * Content-Type: application/json
    * Accept: application/json
    * Authorization: Bearer <token>

---

## SignUp

Crear un Cliente

> POST: `/api/v1/signUp`

Body:

```json
    {
        "ci": String,
        "name": String,
        "lastName": String,
        "phone": String,
        "address": String,
        "email": String,
        "password": String
    }
```

---

## SignIn

Iniciar Session

> POST: `/api/v1/signIn`

Body:

```json
    {
        "email": String,
        "password": String
    }
```

## Reservation

-   Obtener todas las reservas, para filtrar se pude usar una query `?state=Pending`
    `state: ['Pending', 'Paid', 'Deleted', 'Finalized']`
    > GET: `/api/v1/reservation`
-   Obtener un reseva por id
    > GET: `/api/v1/reservation/:id`
-   Obtener el comprobante de los metodos de pago de transferencia bancario o deposito bancario
    > GET: `/api/v1/reservation/:id/voucher`
-   Crear una nueva reserva tomando encuenta que solo se puede reservar una habitacion en una rango de fechas

    > POST: `/api/v1/reservation`

    Body:

    ```json
    {
        "idRoom": number,
        "idUser": number,
        "detail": string,
        "cantDay": number,
        "billingName": string,
        "nitCi": string,
        "paymentMethod": enum['Bank Transfer', 'Bank Deposit', 'Cash', 'Credit Card'],
        "cardNumber": string,
        "entryDate": date
    }
    ```

-   Actualizar una reserva solo si esta pendiente cuando no se pago nada se puede modificar todo, en el caso de pagado solo se actualizan los campos detalles, nombre de factura, nit o ci para la factura

    > PUT: `/api/v1/reservation/:id`

    Body:

    ```json
    {
        "idRoom": number,
        "idUser": number,
        "detail": string,
        "cantDay": number,
        "billingName": string,
        "nitCi": string,
        "paymentMethod": enum['Bank Transfer', 'Bank Deposit', 'Cash', 'Credit Card'],
        "cardNumber": string,
        "entryDate": date
    }
    ```

-   Actualizar el comprobante que es la transferencia bancario o el deposito bancario en la reserva correspondiente

    > PUT: `/api/v1/reservation/:id/voucher`

    Form-Data:

    ```js
    formdata.append('archivo', fileInput.files[0], 'voucher.jpg')
    ```

-   Actualizar el estado de la reserva a `Paid` una vez comprobado el pago de transferencia bancario o el deposito bancario
    > PUT: `/api/v1/reservation/:id/validate`
-   Actualizar el estado de reserva a `Finalized` esto cuando el cliente deshabita y queda libre la habitacion
    > PUT: `/api/v1/reservation/:id/exit`
-   Elimina la reserva, pero no elimina el registro solo cambia de estado a `Deleted` indicando que fechas libres para reservar una habitacion
    > DELETE: `/api/v1/reservation/:id`
-   Elimina el comprobante en caso de equivocarse o no enviar nada
    > DELETE: `/api/v1/reservation/:id/voucher`

---

## Habitaciones

-   Obtener todas las habitaciones, para filtrar se pude usar una query `?state=Available`
    `state: ['Available', 'Reserved', 'Mantenance']`
    > GET: `/api/v1/room`
-   Obtener un habitacion por id
    > GET: `/api/v1/room/:id`
-   Crear una nueva habitacion

    > POST: `/api/v1/room`

    Body:

    ```json
    {
      "number": string,
      "floor": number,
      "description": string,
      "price": decimal,
      "state": enum['Available', 'Reserved', 'Mantenance'],
      "typeRoom": enum['Individual', 'Couple', 'Family', 'matrimonial', 'Presidential']
    }
    ```

-   Actualizar una nueva habitacion por id

    > PUT: `/api/v1/room/:id`

    Body:

    ```json
    {
      "number": string,
      "floor": number,
      "description": string,
      "price": decimal,
      "state": enum['Available', 'Reserved', 'Mantenance'],
      "typeRoom": enum['Individual', 'Couple', 'Family', 'matrimonial', 'Presidential']
    }
    ```

-   Eliminar una habitacion
    > DELETE: `/api/v1/room/:id`

---

## User

-   Obtener todos los usuarios
    > GET: `/api/v1/user`
-   Obtener un usuario por id
    > GET: `/api/v1/user/:id`
-   Crear un nuevo usuario

    > POST: `/api/v1/user`

    Body:

    ```json
    {
        "ci": String,
        "name": String,
        "lastName": String,
        "phone": String,
        "address": String,
        "email": String,
        "password": String
    }
    ```

-   Actualizar un usuario por id

    > PUT: `/api/v1/user/:id`

    Body:

    ```json
    {
        "ci": String,
        "name": String,
        "lastName": String,
        "phone": String,
        "address": String,
        "email": String,
        "password": String
    }
    ```

-   Eliminar un usuario
    > DELETE: `/api/v1/user/:id`
