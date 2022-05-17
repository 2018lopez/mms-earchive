const pdf = require('html-pdf');
const pdfTemplate = require('../documents/invoiceFile');

module.exports = {

    get:{
        async  getInvoicePdf(req, res){
        res.sendFile(`invoice.pdf`,{ root: '.' })

        }

    },

    post:{

        async  invoicePdf(req, res){
            console.log(req.body)
            pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
                if(err) {
                    res.send(Promise.reject());
                }
        
                res.send(Promise.resolve());
            });
           
        },

    }
}