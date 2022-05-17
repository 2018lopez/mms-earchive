const pdf = require('html-pdf');
const pdfTemplate = require('../documents/expenseFile');

module.exports = {

    get:{
        async  getExpensePdf(req, res){
        res.sendFile(`expense.pdf`,{ root: '.' })

        }

    },

    post:{

        async  expensePdf(req, res){
            console.log(req.body)
            pdf.create(pdfTemplate(req.body), {}).toFile('expense.pdf', (err) => {
                if(err) {
                    res.send(Promise.reject());
                }
        
                res.send(Promise.resolve());
            });
           
        },

    }
}