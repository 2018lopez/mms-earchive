const Vendor= require('../models/vendor')

module.exports = {

    get:{

        async totalVendor(req,res){
            let vendor = await Vendor.get.totalVendor()
            let data = JSON.stringify(vendor, (_, v) => typeof v === 'bigint' ? `${v}n` : v).replace(/"(-?\d+)n"/g, (_, a) => a)
            res.send(data)
        },

        async totalVendorStall(req,res){
            let vendor = await Vendor.get.totalVendorStall(req.body.username)
            let data = JSON.stringify(vendor, (_, v) => typeof v === 'bigint' ? `${v}n` : v).replace(/"(-?\d+)n"/g, (_, a) => a)
            res.send(data)
        },

        async latestInvoice(req,res){
            let vendor = await Vendor.get.viewLatestInvoice(req.body.username)
           
            res.send(vendor)

        }


    }
}