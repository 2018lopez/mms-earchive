import * as React from 'react';
import Header from '../Layouts/Header'
import Footer from '../Layouts/Footer'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Container } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.success.main,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
    margin:'10px',
   
  }));

const Contact = ()=>{

    // eslint-disable-next-line jsx-a11y/iframe-has-title
    const newLocal = <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15249.059243010763!2d-89.0830848!3d17.157324799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbz!4v1651850893928!5m2!1sen!2sbz"
       
        height="270"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0" />;

    return(

       <div>
        <Header/>
        <Box sx={{flexGrow: 1,py: 8 }}>
          <Container maxWidth={false}> 
            <h1>Contact Us</h1>
            <Grid container spacing={3} >
                <Grid  container item xs={12} sm={6} md={6
                } direction={{xs: "column"}} >
                    <h2>Contact Information</h2>
                    <Item> 
                        <h3> <LocationOnIcon/>Address</h3>
                        <Box> #1 Joseph Andrews Drive</Box>
                        <Box>San Ignacio Cayo</Box>
                        <Box>Belize, C.A., P.O.Box 163</Box>
                        <h3> Contact Info</h3>
                        <Box>  <b>Email: </b> info@mms.com</Box>
                            <Box> <b>Phone Number:</b> 824-6589 </Box>
                            {/* <Box> <b>Social Accounts :</b> </Box> */}
                            <Box>  <FacebookIcon/> <InstagramIcon/> <LinkedInIcon/> </Box>
                    </Item>
                </Grid>
                <Grid container item xs={12} sm={6} md={6} direction={{xs: "column"}} >
                     <h2>  Directions</h2>
                     {newLocal}
                    <br></br>
                </Grid>
            </Grid>
            </Container>
            </Box>
        <Footer/>
       </div>
    );

};

export default Contact;