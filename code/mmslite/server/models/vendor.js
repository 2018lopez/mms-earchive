const db = require('../config/db')

const vendor ={

    get:{

        
        async totalVendor(){
            let query = 'select * from totalvendor_view'
            return await db(query,0, async data =>data)
        },

        async totalVendorStall(username){

            let query = 'call sp_totalVendorStall(?)'
            return await db(query,[username], async data=>data[0])

        },
        async viewLatestInvoice(username){

            let query = 'call sp_latestInvoiceByUser(?)'
            return await db(query,[username], async data=>data[0])
        }

    }

}

module.exports = vendor