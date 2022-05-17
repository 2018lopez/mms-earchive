//UC-1: AuthVendorandManagement

const user = require('./user')// object with valuid users

function authUser(uname, pwd, utype){//the function authUser will verify if user credentials exist in the system - username, password, usetype(management,vendor)


    if(user.users.some(data => data.username === uname && data.password === pwd && data.uType === utype)){ //verify that parameter pass in exist
        return true
    }
    return false
    
}

module.exports=authUser