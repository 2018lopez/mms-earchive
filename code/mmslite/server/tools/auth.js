const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { user } = require('../config/db.config')


module.exports = {
    get:{

       
       
    },
    post:{
        async login(req, res){
            
            try{

                

                let user =({username: req.body.username, password: req.body.password})
                let _user = await User.get.byUsername(user.username)
            
            
                const match = await bcrypt.compare(user.password,_user[0].password)
                if(!match) return res.status(400).json({msg: "Wrong Password"})
                const userId =_user[0].id
                const username = _user[0].username
                const email = _user[0].email

                //const token = jwt.sign(_user[0].id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });
                const token = jwt.sign( userId, process.env.ACCESS_TOKEN_SECRET,  
                  );

                  res
                  .header('Access-Control-Expose-Headers', 'auth-token', 'username')
                  .header('auth-token', token)
                  .header('username', user.username )
                 
                    res.status(200).json({msg:"Success Login", "token": token, "username": user.username })

           
        
             
        
            }catch(e){
        
               res.status(404).json({msg:"Invalid Username"});
               console.log(e)

        
            }
        
        }         
    }

   
}