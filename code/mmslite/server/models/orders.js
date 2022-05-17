const db = require('../config/db')

const orders ={

    get:{

       
        async byId(id){

            let query = 'CALL getOrderDetails(?)'
            return await db(query, [id], async (data) => data[0]);
        },

        async byReservation(username){

            let query = 'call  getOrdersByReservationId(?)'

            return await db(query,[username], async data =>data[0])
        }

    },

    put:{
        async updateOrder($order){

            let query = 'UPDATE `orders` SET `status` = ? where id = ?;'
            await db(query,[$order.status, $order.id], data=>data)
        }

    }

}

module.exports =orders