import * as React from 'react';
import Button from '@mui/material/Button';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { totalExpense } from '../../../service/call';

const ExpenseReport= ()=>{
    const [expenses, setExpense] = React.useState([]);

      
    React.useEffect(()=>{
      
        getExpense()
        
      
      }, []);

   
     const getExpense = async () =>{

        let username = localStorage.getItem('username')
    
      const res = await totalExpense(username)
      setExpense(res)
    
    
     }

     let usernameIn = localStorage.getItem('username')
     let light =Number(expenses.Electricity)
     let water =Number(expenses.Water)
     let rent =Number(expenses.Rental)

    let exp = {
        
        username : usernameIn,
        price1: light,
        price2: water,
        price3: rent
    }
     
   
 
    
    const  createAndDownloadPdf = () => {
        axios.post('http://localhost:3001/api/vendor/create-expense-pdf', exp)
          .then(() => axios.get('http://localhost:3001/api/vendor/expense-pdf', { responseType: 'blob' }))
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
    
            saveAs(pdfBlob, 'expense.pdf');
          })
      }
    
    return (
            <div>
                
                <Button variant="contained" color='success' onClick={createAndDownloadPdf}>Total Expense <PictureAsPdfIcon color="white"/> </Button>
            </div>
    );    

};

export default ExpenseReport;