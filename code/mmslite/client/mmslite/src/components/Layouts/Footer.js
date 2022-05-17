import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function Footer(){

    return (
        <footer>
            <Box px = {{ xs: 3, sm: 10}} py={{ xs: 5, sm :10}} backgroundColor="#06864D" color="white" >
                <Container maxWidth='lg'>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <h1>MMS</h1>
                            
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1} > <h3>Quick Links </h3></Box>
                            <Box> <Link style={{textDecoration: 'none'}} href="/Explore-Market" color='inherit' >Explore Market</Link></Box>
                            <Box> <Link style={{textDecoration: 'none'}} href="/AboutUs" color='inherit' >About Us</Link></Box>
                            <Box> <Link style={{textDecoration: 'none'}}href="/Be-Vendor" color='inherit' >Be Vendor</Link></Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}> <h3>Contact Information</h3></Box>
                            <Box>  <b>Email: </b> info@mms.com</Box>
                            <Box> <b>Phone Number:</b> 824-6589 </Box>
                            {/* <Box> <b>Social Accounts :</b> </Box> */}
                            <Box>  <FacebookIcon/> <InstagramIcon/> <LinkedInIcon/> </Box>
                        </Grid>

                    </Grid>
                    <Box textAlign="center" pt={{xs: 5, sm: 10}} pb={{xs: 5, sm: 0}} > MMS Lite &reg; {new Date().getFullYear()} </Box>
                </Container>
            </Box>
        </footer>
    )
}