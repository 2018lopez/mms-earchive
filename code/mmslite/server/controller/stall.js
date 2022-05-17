const Stall = require('../models/stall')



const stall = {

    get:{

        async byStallName(req,res){

            let stall = await Stall.get.stallByName()
            res.send(stall)
        },

       async totalStall(req, res){

        let stall = await Stall.get.totalStall()
        let data = JSON.stringify(stall, (_, v) => typeof v === 'bigint' ? `${v}n` : v).replace(/"(-?\d+)n"/g, (_, a) => a)
        res.send(data)

       },

       async stallByMarket(req,res){
           let stall = await Stall.get.stallByMarket(req.body.stall)
           res.send(stall)
       },

       async stallInCayo(req,res){

        let stall = await Stall.get.stallsInCayo()
        res.send(stall)

       },

       async stallInCorozal(req,res){

        let stall = await Stall.get.stallsInCorozal()
        res.send(stall)

       },
       async stallInOrange(req,res){

        let stall = await Stall.get.stallsInOrange()
        res.send(stall)

       },
       async stallInBelize(req,res){

        let stall = await Stall.get.stallsInBelize()
        res.send(stall)

       },

       async stallInStann(req,res){

        let stall = await Stall.get.stallsInStann()
        res.send(stall)

       },

       async stallInToledo(req,res){

        let stall = await Stall.get.stallsInToledo()
        res.send(stall)

       },

       async viewStallByCode(req,res){

        let stall = await Stall.get.viewStallByCode(req.body.stallCode)
        res.send(stall)

       },

       async stallView(req,res){

        let stall = await Stall.get.stallView()
        res.send(stall)

       },

       async stallCategory(req,res){

        let stall = await Stall.get.categoryStall()
        res.send(stall)

       }

    },

    post:{

        async addStall(req,res){
           let filePath = require('../config').uploads_dir
            let vStall = req.files ? req.files.image : null
            let stallStatus = req.files
            filePath = filePath + (new Date()).getTime() + '.' + stallStatus.image.name.split('.').pop()

           if(vStall){

            vStall.mv(filePath)
            let stall = {}
                stall.stallName = req.body.stall
                stall.market = req.body.market
                stall.fee = parseInt(req.body.fee)
                stall.vimage = 'uploads/' + filePath.split('\\').pop()
                stall.description = req.body.description

                try{
                    
                    
                    let data = Stall.post.createStall(stall)
                res.json({msg: "Successfully Created Stall"})

                }catch(e){
                    console.log(e)
                }

           }else{

            res.status(404).json({msg: "No Image file"})
           }
                
                
            
        }
    },

    put:{

        async updateStall(req, res){

            let stall ={}

            stall.stallName = req.body.stall
            stall.stallStatus = req.body.sstatus
         

            try{

                let data = await Stall.put.updateStall(stall)
                res.json({msg:"Successfully Update Stall!"})
            }catch(e){

                console.log(e)
            }



        }
    }
    
   


}

module.exports={stall}