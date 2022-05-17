const db = require('../config/db')

const role ={

    get:{

        async allRoles(){
            let query = 'select type from user_type'
            return await db(query,0, async data => data)
        },
        async byId(id){

            let query = 'select type from user_type where id = ?'
            return await db ( query,[id], async data => data.filter(item=>item.id)[0])
        },

        async byUsername(username){

            let query = 'call sp_userRole(?);'

            return await db(query,[username], async data =>data[0][0])
        }

    }

}

module.exports =role