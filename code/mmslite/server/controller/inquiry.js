const Inquiry = require('../models/inquiry')

module.exports = {

    get:{

        async Inquiries (req, res){
            let inquiries = await Inquiry.get.allInquiry()
            res.send(inquiries)
        },

        async totalInquiry(req,res){
            let inquiry = await Inquiry.get.totalInquiry()
            let data = JSON.stringify(inquiry, (_, v) => typeof v === 'bigint' ? `${v}n` : v).replace(/"(-?\d+)n"/g, (_, a) => a)
            res.send(data)
        }
    },

    post:{

        async newInquiry(req, res){

            let data = {username: req.body.username, subject: req.body.subject, date: req.body.date, detail: req.body.detail  }

            try{
                
                await Inquiry.post.createInquiry(data)               
                res.json({ msg:'Inquiry Created'})

            }catch(e){

                res.json({'Inquiry Data':'error', message: 'An Error has occur while creating inquiry'})

            }

        }

    }
}