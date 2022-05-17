const db = require('../config/db')

const inquiry ={

    get:{

        async allInquiry(){
            let query = 'select * from inquiry_view '
            return await db(query,0, async data =>data.filter(item=>item.id))
        },

        async totalInquiry(){
            let query = 'select * from totalinquiry_view'
            return await db(query,0, async data =>data)
        }



    },

    post:{
        async createInquiry($inquiry){

            let query = 'call sp_createInquiry(?,?,?,?)'
            await db(query,[$inquiry.username, $inquiry.subject, $inquiry.detail, $inquiry.date], data=>data)
        }
    }

}

module.exports=inquiry