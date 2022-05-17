const db = require('../config/db')

const district ={

    get:{

        async allDistricts(){
            let query = 'select name from district'
            return await db(query,0, async data => data)
        }
      

       

    }

}

module.exports =district