import * as React from 'react';
import InvoiceChart from '../components/ReportChart'
import InvoiceBar from '../components/ReportBar'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ExpenseReport from '../components/ReportExpense'
import InvoiceReport from '../components/ReportInvoice'
import StockReport from '../components/ReportStock'

const Report= ()=>{

   
    
    return (
            <div>
                <h1>Display Report </h1> 
                <InvoiceChart/>
                <br></br>
                <InvoiceBar/>
                <br></br>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={4}>
                            <ExpenseReport/>
                        </Grid>
                        <Grid item xs={4}>
                            <InvoiceReport/>
                        </Grid>
                        <Grid item xs={4}>
                            <StockReport/>
                        </Grid>
                      
                    </Grid>
                </Box>
              
            </div>
    );    

};

export default Report;