const db = require('../config/db')

const product ={

    get:{

        async productStock(username){
            let query = 'call sp_stockAvailable(?)'
            return await db(query,[username], async data =>data[0])
        },

        async vendorProduct(username){

            let query = 'call sp_viewProductByVendor(?)'
            return await db(query,[username], async data =>data[0])
        },

        async productByStall(stall){

            let query = 'call sp_getProductByStall(?)'
            return await db(query,[stall], async data =>data[0])
        }

        


       
    },

    post:{

        async createProduct($product){
            let query = 'call sp_createProduct(?,?,?,?,?,?,?) '
            return await db(query,[$product.username, $product.pCode, $product.pName, $product.img,  $product.price,$product.pStatus,  $product.details ],async (data)=>data[0])
        }
    }

}

module.exports =  product