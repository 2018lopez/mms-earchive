const Role = require('../models/role')

module.exports = {

    get:{

        async roles (req, res){
            let roles = await Role.get.allRoles()
            res.send(roles)
        },

        async roleByUsername(req, res){
            
            let role = await Role.get.byUsername(req.params.user)
            res.send(role)
        }
    }
}