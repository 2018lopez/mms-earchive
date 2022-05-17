const Invoice = require('../models/invoice')

module.exports = {

    get:{

        async totalInvoice(req,res){
            let invoice = await Invoice.get.totalInvoice()
            let data = JSON.stringify(invoice, (_, v) => typeof v === 'bigint' ? `${v}n` : v).replace(/"(-?\d+)n"/g, (_, a) => a)
            res.send(data)
        },

        async totalExpense(req, res){
           
            let expense = await Invoice.get.totalExpense(req.body.username)
            res.send(expense)
        },

        async invoiceStatus(req, res){
            let invoice = await Invoice.get.statusInvoice(req.body.username)
            res.send(invoice)
        },

        async invoiceReport(req,res){
            let iReport = await Invoice.get.invocieReport(req.body.username)
            res.send(iReport)
        },

        async invoiceList(req,res){
            let invoice = await Invoice.get.invoiceList()
            res.send(invoice)
        },

        async invoicePending(req,res){

            let invoice = await Invoice.get.invoicePending()
            res.send(invoice)
        },

        async viewInvoiceByNo(req,res){

            let invoice = await Invoice.get.viewInvoiceByNo(req.body.invoice)
            res.send(invoice)
        },

        async totalPaidPending(req,res){

            let invoice = await Invoice.get.totalPaidPending()
            let data = JSON.stringify(invoice, (_, v) => typeof v === 'bigint' ? `${v}n` : v).replace(/"(-?\d+)n"/g, (_, a) => a)
            res.send(data)

        },

        async byReservationId(req,res){

            let invoice = await Invoice.get.byReservationId(req.body.username)
            res.send(invoice)
        }
    },

    post:{

        async createInvoice(req,res){
            let invoice ={}

            
                invoice.stall = req.body.stall
                invoice.total = parseInt(req.body.total)
                invoice.dueDate = req.body.dueDate
                invoice.rent = parseInt(req.body.rent)
                invoice.light = parseInt(req.body.light)
                invoice.water = parseInt(req.body.water)
                invoice.detail = req.body.dDetails
                invoice.other = parseInt(req.body.other)
                try{
                    console.log(invoice)
                    let data = Invoice.post.createInvoice(invoice)
                  res.json({msg: "Successfully Created Invoice"})

            }catch(e){
                console.log(e)
            }
        }

    }, 

    put:{

        async updateInvoiceStatus(req,res){
            let invoice ={}

            
                invoice.invoiceNo = req.body.invoiceNoUpdate
                invoice.status = req.body.editStatus
               
                try{
                    
                    let data = Invoice.put.updateInvoiceStatus(invoice)
                  res.json({msg: "Successfully Updated Invoice"})

            }catch(e){
                console.log(e)
            }
        }

    }
}