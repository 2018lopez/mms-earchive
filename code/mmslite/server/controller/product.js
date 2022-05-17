const Product = require('../models/product')

module.exports = {

    get:{

        async productStock(req,res){
            let product = await Product.get.productStock(req.body.username)
            let data = JSON.stringify(product, (_, v) => typeof v === 'bigint' ? `${v}n` : v).replace(/"(-?\d+)n"/g, (_, a) => a)
            res.send(data)
        },

        async vendorProduct(req,res){

            let product = await Product.get.vendorProduct(req.body.username)
            res.send(product)
        },

        async productByStall(req,res){
            
            let product = await Product.get.productByStall(req.body.stall)
            res.send(product)

        }

     
    },

    post:{

        async addProduct(req,res){
            let filePath = require('../config').uploads_dir
             let vStall = req.files ? req.files.image : null
             let stallStatus = req.files
             
             
             filePath = filePath + (new Date()).getTime() + '.' + stallStatus.image.name.split('.').pop()
           
            if(vStall){
 
             vStall.mv(filePath)
           
             let product = {}
                 product.username = req.body.username
                 product.pCode = req.body.pCode
                 product.pName = req.body.pName
                 product.img = 'uploads/' + filePath.split('\\').pop()
                 product.pStatus = req.body.pStatus
                 product.price = parseFloat(req.body.price)
                 product.details = req.body.details
 
                 try{
                     
                   
                 let data = Product.post.createProduct(product)
                 res.json({msg: "Successfully Created Product"})
 
                 }catch(e){
                     console.log(e)
                 }
 
            }else{
 
             res.status(404).json({msg: "No Image file"})
            }
                 
                 
             
         }
    }
}