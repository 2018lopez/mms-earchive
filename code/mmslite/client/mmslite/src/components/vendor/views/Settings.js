import React, { useState, useEffect, forwardRef} from 'react';
import Button from '@mui/material/Button';
import {TextField, Box, Grid, Paper} from '@mui/material';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Settings() {
  const [vendorProfile, setVendorProfile] = useState([]);
  const [telValue, setTelValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState([])
  useEffect(()=>{
    getVendorDetails() 
   
    }, []);

  const getVendorDetails = async () => {
    let username= localStorage.getItem('username')
    const res = await axios.post('http://localhost:3001/api/vendor/profile', {username: username});    
    setVendorProfile(res.data)    
    setTelValue(res.data[0].tel)
    setUsernameValue(res.data[0].username)  
    setUserId(res.data[0].id)  
  }
  
  const handleSave = async() => {
    setOpen(true);
    await axios.put(`http://localhost:3001/api/vendor/update-setting`, 
    {id: userId, tel: telValue, username: usernameValue});        
  };
  const handleReset = () => {
    setTelValue("");
    setUsernameValue("");
    getVendorDetails();
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);    
  };

 
  const Input = styled('input')({
    display: 'none',
  });
  
  return (
    // <Paper  component='form' sx={{width: '50%'}}>
    <>
    
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 'auto',  maxWidth: 'lg', justifyContent: 'center' },
      }}
      noValidate
      autoComplete="off"
    > 
    
    <Paper sx={{padding: '1%'}} >
    {vendorProfile.map((row) =>(
      <Grid  container spacing={2} > 
      
        <Grid item xs={12} sm={12} md={12} lg={12}> 
        {/* <div> */}
          <h2>Profile Settings</h2>
        {/* </div> */}
      </Grid>
        
      <Grid item xs={12} sm={6} md={4} lg={3} key={row.id}> 
        <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='id-input' >
          ID
        </InputLabel>
        
          <TextField 
            id='id-input'
            fullWidth 
            disabled
            // focused 
            size='small'        
            // onChange={onSubjectChange}
            value={row.id}
            // label={"ID"} //optional         
          /> 
            
      </Grid>
     
      <Grid item xs={12} sm={6} md={4} lg={3}> 
        <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='na-input' >
          NAME
        </InputLabel>       
          <TextField 
            id='na-input'
            fullWidth 
            disabled
            // focused
            size='small'         
            // onChange={onSubjectChange}
            value={row.name}          
          />     
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='a1-input' >
          ADDRESS 1
        </InputLabel>       
          <TextField 
            id='a1-input'
            fullWidth 
            disabled
            // focused
            size='small'         
            // onChange={onSubjectChange}
            value={row.address1}          
          /> 
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='a2-input' >
            ADDRESS 2
          </InputLabel>       
          <TextField 
            id='a2-input'
            fullWidth 
            disabled
            // focused
            size='small'         
            // onChange={onSubjectChange}
            value={row.address2}          
          /> 
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}> 
          <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='di-input' >
            DISTRICT
          </InputLabel>
          <TextField 
            id='di-input'
            fullWidth 
            disabled
            // focused  
            size='small'       
            // onChange={onSubjectChange}
            value={row.district}          
            // InputLabelProps={{ style: { fontSize: '90%' } }}
          />     
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}> 
        <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='em-input' >
          EMAIL
        </InputLabel>       
          <TextField 
            id='em-input'
            fullWidth 
            disabled
            // focused 
            size='small'        
            // onChange={onSubjectChange}
            value={row.email}                    
          />     
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}> 
        <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor=' ph-input' >
          PHONE
        </InputLabel>
          <TextField 
            id='ph-input'
            fullWidth 
            // focused 
            size='small'        
            onChange={(e) => setTelValue(e.target.value)}
            value={telValue}                    
          />     
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='un-input' >
            USERNAME
          </InputLabel>        
          <TextField 
            id='un-input'
            fullWidth 
            // focused
            size='small'         
            onChange={(e) => setUsernameValue(e.target.value)}
            value={usernameValue}            
          />     
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='pw-input' >
            PASSWORD
          </InputLabel>        
          <TextField 
            id='pw-input'
            disabled
            fullWidth 
            // focused 
            size='small'        
            // onChange={onSubjectChange}
            value={'********'}
            // value={row.password}          
          />     
        </Grid>
                
        
        <Grid item xs={12} sm={6} md={4} lg={3} >
          {/* <Stack >             */}
            <InputLabel sx={{fontSize: '70%'}} align='left'>
              STATUS
            </InputLabel>           
          {/* </Stack> */}
          <Stack direction={'row'}>            
            <div >
              {row.status === '1' ? 
              <ToggleOnIcon style={{fontSize: '45', color: '#2196f3' }}/>:'' 
              }
            </div>          
          </Stack>          
        </Grid> 
               
        
      </Grid>
    ))}
      </Paper>
      
      <Grid style={{padding: '2% 0 0 0'}} container spacing={2}>
        <Grid item align="right" display='flex'>
          <div style={{padding: '0 10% 0 0'}}>
            <Button variant='contained' onClick={handleSave}>Save</Button>
          </div>
          <div>
            <Button variant='outlined' onClick={handleReset}>Reset</Button>
          </div> 
        </Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Saved Successfully!
        </Alert>
      </Snackbar>            
    </Box>   
    </>
  );
}
