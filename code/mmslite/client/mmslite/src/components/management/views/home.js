import * as React from 'react'
import { totalInquiry, totalInvoice, totalVendor, totalStall } from '../../../service/call';
import { Avatar, Box, Card, CardContent, Grid, Typography, Container } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupIcon from '@mui/icons-material/Group';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InvoiceChart from '../components/Home/HomePieChart';

export default function Home() {
    const [inquiries, setInquiry] = React.useState([]);
    const [invoices, setInvoice] = React.useState([]);
    const [vendors, setVendor] = React.useState([]);
    const [stalls, setStall] = React.useState([]);

    React.useEffect(()=>{
  
        getInquiries()
        getInvoices()
        getVendors()
        getStalls()
     
    }, []);
  
    
    const getInquiries = async () =>{
      const res = await totalInquiry()
      setInquiry(res)
    }

    const getInvoices = async () =>{
      const res = await totalInvoice()
      setInvoice(res)
    }

    const getVendors = async () =>{
      const res = await totalVendor()
      setVendor(res)
    }

    const getStalls = async () =>{
      const res = await totalStall()
      setStall(res)
    }
  
  
    return (
      <div>
          <h1> Home</h1>
          <Box sx={{flexGrow: 1,py: 8 }}>
          <Container maxWidth={false}> 
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3} >
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
                          Inquires
                        </Typography>
                        <Typography
                          color="textPrimary"
                          variant="h4"
                        >
                          {inquiries}
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
                          <InfoIcon/>
                        </Avatar>
                      </Grid>
                    </Grid>
                    
                  </CardContent>
                </Card>
              </Grid>
              {/* End of Inquiry Card */}

              {/* Invoices Card Begin */}
              <Grid item   xs={12} sm={6} md={3} >
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
                          Invoices
                        </Typography>
                        <Typography
                          color="textPrimary"
                          variant="h4"
                        >
                          {invoices}
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

              {/* Begin of Vendor Card */}
              <Grid item xs={12} sm={6} md={3} >
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
                          Vendors
                        </Typography>
                        <Typography
                          color="textPrimary"
                          variant="h4"
                        >
                        {vendors}
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
                           <GroupIcon/>
                        </Avatar>
                      </Grid>
                    </Grid>
                    
                  </CardContent>
                </Card>
              </Grid>
            {/* End of Vendor Card  */}

            {/* Begin of Stall Card */}

            <Grid item xs={12} sm={6} md={3} >
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
                         {stalls}
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
              <InvoiceChart/>            
          </Container>

          {/* Card for Latest Invoice */}
          
          </Box>
      </div>
    );
  }

 