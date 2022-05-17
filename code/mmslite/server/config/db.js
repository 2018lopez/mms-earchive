const mariadb = require('mariadb'), config = require('./db.config')

async function db(action,params,cb){

    let connection = await mariadb.createConnection(config)

    try{
       
        const response = params==0?await connection.query(action): await connection.query(action,params)
        connection.end()
        return await cb(response)
    }
    catch(e){
        console.log(e)
        throw e;
    }
    finally{
        if(connection) connection.end()
    }
}
module.exports = db