const db = require('../config/db')

const market ={

    get:{

        async allMarkets(){
            let query = 'select m_name from market'
            return await db(query,0, async data => data)
        },
        

    }

}

module.exports = market