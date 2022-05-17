import Button from '@mui/material/Button';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { invoiceReport } from '../../../service/call';
import * as React from 'react';


const InvoiceReport = ()=>{

    const [invoices, setInvoice] = React.useState([]);

    React.useEffect(()=>{
      
        getInvoices()
        
      
      }, []);

    const getInvoices= async () =>{

        let username = localStorage.getItem('username')
    
        const res = await invoiceReport(username)
        setInvoice(res)
        
     }


   let inv = {
        username : localStorage.getItem('username'),
        pending: Number(invoices.Pending),
        total: Number(invoices.Total)
       
      }
    
 
    
    const  createAndDownloadPdf = () => {
        axios.post('http://localhost:3001/api/vendor/create-invoice-pdf', inv)
          .then(() => axios.get('http://localhost:3001/api/vendor/invoice-pdf', { responseType: 'blob' }))
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
    
            saveAs(pdfBlob, 'invoice.pdf');
          })
      }
    
    return (
            <div>
                
                <Button variant="contained" color='success' onClick={createAndDownloadPdf} >Pending Invoices <PictureAsPdfIcon color="white"/> </Button>
            </div>
    );    

};

export default InvoiceReport;