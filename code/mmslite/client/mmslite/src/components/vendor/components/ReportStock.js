import * as React from 'react';
import Button from '@mui/material/Button';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { stockReport } from '../../../service/call';


const StockReport= ()=>{

    const [stocks, setStock] = React.useState([]);

    React.useEffect(()=>{
      
        getStocks()
        
      
      }, []);

    const getStocks= async () =>{

        let username = localStorage.getItem('username')
    
        const res = await stockReport(username)
        setStock(res)
    
     }


    let stk = {
        username : localStorage.getItem('username'),
        total: stocks.stock
      }
    
 
    
    const  createAndDownloadPdf = () => {
        axios.post('http://localhost:3001/api/vendor/create-product-pdf', stk)
          .then(() => axios.get('http://localhost:3001/api/vendor/product-pdf', { responseType: 'blob' }))
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
    
            saveAs(pdfBlob, 'stocks.pdf');
          })
      }
    
    return (
            <div>
                
                <Button variant="contained" color='success' onClick={createAndDownloadPdf} >Available Stocks <PictureAsPdfIcon color="white"/> </Button>
            </div>
    );    

};

export default StockReport;