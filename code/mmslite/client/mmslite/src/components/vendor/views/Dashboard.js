
import * as React from 'react'

import {   invoiceStatus,  vendorStallTotal, vendorLatestInvoice } from '../../../service/call';
import { Avatar, Box, Card, CardContent, Grid, Typography, Container ,CardHeader,Divider} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import StorefrontIcon from '@mui/icons-material/Storefront';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import PaidIcon from '@mui/icons-material/Paid';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { SeverityPill } from '../../management/components/Invoice/util';

export default function DashBoard() {  

  

  const [invoices, setInvoice] = React.useState([]);
  const[viewInvoices, setViewInvoice] = React.useState([])
  const [stalls, setStall] = React.useState([]);

  React.useEffect(()=>{

      
      getInvoices()
   
      getStalls()
      viewLatestInvoice()
   
  }, []);

 

  const getInvoices = async () =>{
    let username = localStorage.getItem('username')

    const res = await invoiceStatus(username)
    setInvoice(res)
  }

  const viewLatestInvoice = async () =>{

    let username = localStorage.getItem('username')

    const res = await vendorLatestInvoice(username)
    
    setViewInvoice(res.data[0])

  }
 

  const getStalls = async () =>{
    let username = localStorage.getItem('username')
    const res = await vendorStallTotal(username)
    setStall(res)
  }

  return (
    <div>
      <h1>Home</h1>
      <Box sx={{flexGrow: 1,py: 8 }}>
          <Container maxWidth={false}> 
            <Grid container spacing={4}>
             

              {/* Invoices Card Begin */}
              <Grid item   xs={12} sm={6} md={6} >
                  <Card >
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                      sx={{ justifyContent: 'space-between' }}
                    >
                      <Grid item>
                        <Typography
                          color="textSecondary"
                          gutterBottom
                          variant="overline"
                        >
                          Pending Invoices
                        </Typography>
                        <Typography
                          color="textPrimary"
                          variant="h4"
                        >
                          {invoices.Pending}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                          sx={{
                            backgroundColor: 'success.main',
                            height: 56,
                            width: 56
                          }}
                        >
                         <DescriptionIcon/>
                        </Avatar>
                      </Grid>
                    </Grid>
                    
                  </CardContent>
                </Card>
              </Grid>

             

            {/* Begin of Stall Card */}

            <Grid item xs={12} sm={6} md={6} >
                <Card >
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                   
                      sx={{ justifyContent: 'space-between' }}
                    >
                      <Grid item>
                        <Typography
                          color="textSecondary"
                          gutterBottom
                          variant="overline"
                        >
                         Stalls
                        </Typography>
                        <Typography
                          color="textPrimary"
                          variant="h4"
                        >
                         {stalls.total}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                          sx={{
                            backgroundColor: 'success.main',
                            height: 56,
                            width: 56
                          }}
                        >
                        <StorefrontIcon/>
                        </Avatar>
                      </Grid>
                    </Grid>
                    
                  </CardContent>
                </Card>
              </Grid>
              {/* End of Stall Card */}
            </Grid>
                      
            </Container>
          </Box>
          <Container>
              <Card>
                    <CardHeader
                      sx ={{bgcolor: 'success.main', color:'white',  fontWeight: 'bold' }}
                    title = {'Latest Invoice'}
                    />
                  
                    <CardContent>
                    <Divider />
                    <Grid
                        container
                        spacing={3}
                        sx={{ justifyContent: 'flex-start' }}
                    >
                      <Grid
                        item
                        md={5}
                        xs={12}
                        
                        >
                          <Grid item>
                          <Typography display="inline"variant="h6" gutterBottom component="div"  sx={{ fontWeight: 'bold' }}>
                          <DescriptionIcon color="success" /> Invoice No. : 
                          </Typography>
                          <Typography display="inline" variant="subtitle1" gutterBottom component="div" >
                                {viewInvoices.invoice}
                          </Typography>
                          
                          </Grid>
                        
                        
                        </Grid>
                        <Grid
                        item
                        md={5}
                        xs={12}
                        >
                          <Grid item>
                          <Typography display="inline"variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                              <RadioButtonCheckedIcon color="success" />  Status:
                          </Typography>
                          <Typography display="inline" variant="subtitle1" gutterBottom component="div" >
                              <SeverityPill
                                  color={(viewInvoices.status === 'Paid' && 'success')
                                  || (viewInvoices.status === 'Pending' && 'error')
                                  || 'warning'}
                                >{viewInvoices.status}</SeverityPill>
                          </Typography>
                          
                          </Grid>
                        
                        
                        </Grid>
                        <Grid
                        item
                        md={5}
                        xs={12}
                        >
                          <Grid item>
                          <Typography display="inline"variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                              <PaidIcon color="success" /> Total:
                          </Typography>
                          <Typography display="inline" variant="subtitle1" gutterBottom component="div" >
                             {viewInvoices.total}
                          </Typography>
                          
                          </Grid>
                        
                        
                        </Grid>
                        <Grid
                        item
                        md={5}
                        xs={12}
                        >
                          <Grid item>
                          <Typography display="inline"variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                              <EventNoteIcon color="success" /> Due Date:
                          </Typography>
                          <Typography display="inline" variant="subtitle1" gutterBottom component="div" >
                              {viewInvoices.date}
                          </Typography>
                          
                          </Grid>
                        
                        
                        </Grid>
                        <Grid
                        item
                        md={5}
                        xs={12}
                        >
                          <Grid item>
                          <Typography display="inline"variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                          <AssuredWorkloadIcon color="success"/> Rent:
                          </Typography>
                          <Typography display="inline" variant="subtitle1" gutterBottom component="div" >
                              {viewInvoices.rent}
                          </Typography>
                          
                          </Grid>
                        
                        
                        </Grid>
                        <Grid
                        item
                        md={5}
                        xs={12}
                        >
                          <Grid item>
                          <Typography display="inline"variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                           <LightbulbIcon color="success" /> Electricity:
                          </Typography>
                          <Typography display="inline" variant="subtitle1" gutterBottom component="div" >
                              {viewInvoices.light}
                          </Typography>
                          
                          </Grid>
                        
                        
                        </Grid>
                        <Grid
                        item
                        md={5}
                        xs={12}
                        >
                          <Grid item>
                          <Typography display="inline"variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                           <InvertColorsIcon color="success" /> Water:
                          </Typography>
                          <Typography display="inline" variant="subtitle1" gutterBottom component="div" >
                             {viewInvoices.water}
                          </Typography>
                          
                          </Grid>
                        
                        
                        </Grid>
                        <Grid
                        item
                        md={5}
                        xs={12}
                        >
                          <Grid item>
                          <Typography display="inline"variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                           <AddCircleIcon color="success" /> Other:
                          </Typography>
                          <Typography display="inline" variant="subtitle1" gutterBottom component="div" >
                             {viewInvoices.other}
                          </Typography>
                          
                          </Grid>
                        
                        
                        </Grid>
                        <Grid
                        item
                        md={5}
                        xs={12}
                        >
                          <Grid item>
                          <Typography display="inline"variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                          <StorefrontIcon  color="success"/> Stall:
                          </Typography>
                          <Typography display="inline" variant="subtitle1" gutterBottom component="div" >
                            {viewInvoices.stall}
                          </Typography>
                          
                          </Grid>
                        
                        
                        </Grid>
                        <Grid
                        item
                        md={5}
                        xs={12}
                        >
                          <Grid item>
                          <Typography display="inline"variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                          <StorefrontIcon  color="success"/> Market:
                          </Typography>
                          <Typography display="inline" variant="subtitle1" gutterBottom component="div" >
                            {viewInvoices.market}
                          </Typography>
                          
                          </Grid>
                        
                        
                        </Grid>
                    </Grid>
                    </CardContent>
                    
                    </Card>
                    </Container>
                  </div>
  );
}