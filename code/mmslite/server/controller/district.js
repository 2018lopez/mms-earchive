const District = require('../models/district')

module.exports = {

    get:{

        async districts (req, res){
            let districts = await District.get.allDistricts()
            res.send(districts)
        }
    }
}