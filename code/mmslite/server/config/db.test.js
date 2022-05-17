const db = require('./db')


async function main(){
    let data = await db('select * from user;',0,$data=>$data.filter(item=>item.id))
    console.log(data)
}

main()