const Market = require('../models/market')

module.exports = {

    get:{

        async markets (req, res){
            let markets = await Market.get.allMarkets()
            res.send(markets)
        }

    }
}