const pdf = require('html-pdf');
const pdfTemplate = require('../documents/productFile');

module.exports = {

    get:{
        async  getStockPdf(req, res){
        res.sendFile(`stock.pdf`,{ root: '.' })

        }

    },

    post:{

        async  stockPdf(req, res){

            pdf.create(pdfTemplate(req.body), {}).toFile('stock.pdf', (err) => {
                if(err) {
                    res.send(Promise.reject());
                }
        
                res.send(Promise.resolve());
            });
           
        },

    }
}