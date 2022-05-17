import * as React from 'react';
import Route from './route'
import Header from '../Layouts/Header'
import Footer from '../Layouts/Footer'
import { Avatar, Box, Card, CardContent, Grid, CardMedia, Typography, Container ,CardHeader,Divider} from '@mui/material';

const Main = ()=>{

    return(

      <div>
        <Header/>
          <h1>Home</h1>
          <Box sx={{flexGrow: 1,py: 8 }}>
          <Container maxWidth={false}> 
            <Grid container spacing={4}>
             

              {/* Invoices Card Begin */}
              <Grid item   xs={12} sm={6} md={12}  sx={{ justifyContent: 'center' }}>
                  <Card >
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                      sx={{ justifyContent: 'space-evenly' }}
                    >
                      <Grid item  >
                       
                       <Box >
                        <Grid item >
                          <Typography
                          
                            gutterBottom
                            variant="h6"
                          
                          >
                          Explore the Market
                          </Typography>
                          <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="subtitle"
                          
                          >
                        Improve productivity and management of all marketstakeholders by using MMSLite.
                          </Typography>
                        </Grid>
                        
                       </Box>
                      </Grid>
                      <Grid item>
                      <CardMedia
                            component="img"
                            height="250"
                            image={`http://localhost:3001/uploads/1652480333114.jpg`}
                            alt="Stall Image"
                        />
                      </Grid>
                    </Grid>
                    
                  </CardContent>
                </Card>
              </Grid>
               </Grid>
          </Container>        
          </Box>   
        <Footer/>
      </div>
    );

};

export default Main;