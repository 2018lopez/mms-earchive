class Base{
    constructor(session,data){
       
        this.isLoggedIn = session.isLoggedIn
        this.username= session.username
        this.data = data
        this.user = session.user
        this.error = session.error
       
    }
}

module.exports = Base