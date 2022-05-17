const Order = require('../models/orders')

module.exports = {

    get:{

      
        async byId(req,res){

            let order = await Order.get.byId(req.body.id)
            res.send(order)
        },
        async byReservation(req,res){
            let order = await Order.get.byReservation(req.body.username)
           
            res.send(order)
        }
    },

    put:{

        async updateOrder(req, res){

            let dataOrder = {status:req.body.status, id:req.body.id}
            let order = await Order.put.updateOrder(dataOrder)
            res.send(order)
        }

    }
}