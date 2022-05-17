const db = require('../config/db')

const stall ={

    get:{

      async stallByName(){

        let query = 'select code_name from stall'
        return await db(query,0, async data=>data)

      },

      async totalStall(){

        let query = 'select * from totalstall_view'
        return await db(query,0, async data=>data)
      },
      async stallByMarket(market){
       
        let query = 'call sp_stallByMarket(?)'
        return await db(query,[market], async data=>data[0])
      },

      async stallsInCayo(){

        let query = 'select * from stallsincayo_view'
        return await db(query,0, async data =>data)

      },
      async stallsInCorozal(){

        let query = 'select * from stallsincorozal_view'
        return await db(query,0, async data =>data)

      },
      async stallsInOrange(){

        let query = 'select * from stallsinorange_view'
        return await db(query,0, async data =>data)

      },
      async stallsInBelize(){

        let query = 'select * from stallsinbelize_view'
        return await db(query,0, async data =>data)

      },
      async stallsInStann(){

        let query = 'select * from stallsinstann_view'
        return await db(query,0, async data =>data)

      },
      async stallsInToledo(){

        let query = 'select * from stallsintoledo_view'
        return await db(query,0, async data =>data)

      },


     
      async viewStallByCode(stall){

      let query = 'call sp_viewStallByCode(?)'
      return await db(query,[stall], async data=>data[0])
      },

      async stallView(){
        let query = 'select * from stalls_view'
        return await db(query,0, async data =>data)
      },

      async categoryStall(){

        let query = 'select type as name from category'
        return await db(query,0, async data =>data)
      }

      

    },

    post:{

      async createStall($stall){
        
        let query = 'call sp_createStall(?,?,?,?,?) '
        return await db(query,[$stall.stallName, $stall.market, $stall.fee, $stall.vimage, $stall.description],async (data)=>data[0])
      }

    },

    put:{

      async updateStall($stall){
        let query = 'call sp_updateStall(?, ?)'
       return await db(query,[$stall.stallName, $stall.stallStatus],async (data)=>data[0])
      }
    }

}

module.exports = stall