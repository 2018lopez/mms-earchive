const db = require('../config/db')
const bcrypt = require('bcrypt')
const argon2 = require('argon2')
const jwt = require("jsonwebtoken")


const user ={

    get:{

        async all(){
            return await db('select * from user', 0, async data=>data.filter(item=>item.id))
        },

        async byId(id){

            return await db('select * from user where id =?', [id], async data =>data[0])
        },

        async byUsername(username){
            return await db('select * from user where username = ?', [username], async data=>data.filter(item=>item.id))
        },

        async bytoken(token){

            return await db('select * from user where token = ?',[token], async data=>data.filter(item=>item.id))
        },

        async vendorProfileById(username){
            // let query = 'CALL `getOrdersByID`()';

            let query = 'CALL getVendorProfile(?)';            
            return await db(query, [username], async (data) => data[0]);
        },
    },

    async create($user){

        const salt = await bcrypt.genSalt()
        $user.password =  await bcrypt.hash($user.password, salt);
        let result = await db('call sp_user_create(?,?,?,?,?,?,?,?,?)', 
            [$user.name, $user.address1,$user.address2, $user.district, $user.tel, $user.email, $user.username, $user.password, $user.userType],
            async (data)=>data[0]
        )

        
        return result
    },

    

  



    async editPassword($user){
        let query = `
            update user
            set password = ?
            where username = ?;
        `
        const salt = await bcrypt.genSalt()
        let newPassword = await bcrypt.hash($user.password, salt);
        try{
            await db(query, [newPassword,$user.username],data=>data)

            return {status:'ok', message:'your password has been updated successfully'}

        }catch(e){
            return {status:'error',message:'your password could not be updated'}
        }
    },

    async updateProfile($profile){

        let query = 'UPDATE `user` SET `tel` = ?, `username` = ? where id = ?;'
        await db(query,[$profile.tel, $profile.uName, $profile.id], data=>data)
    },
    

}

module.exports = user