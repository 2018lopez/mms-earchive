import React, {forwardRef, useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import {TextField, Box, Grid, Paper} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//retrieved after login
let reservationId = 1;

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Stall() {
  const [rDetails, setRDetails] = useState([]);
  // const [textValue, setTextValue] = useState("");
  const [telValue, setTelValue] = useState('');
  const [bNameVal, setBNameVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [fbVal, setFbVAl] = useState('');
  const [igVal, setIgVal] = useState('');
  const [desVal, setDesVal] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    getReservationDetails();    
  }, []);

  const getReservationDetails = async () =>{
    let username = localStorage.getItem('username')
    const res = await axios.post(`http://localhost:3001/api/vendor/stall-reserve`, {username:username});
   
    setRDetails(res.data); 
    if(res.data[0].business_name !== null){
      setBNameVal(res.data[0].business_name);
    }
    if(res.data[0].business_tel !== null){
      setTelValue(res.data[0].business_tel);
    }
    if(res.data[0].business_name !== null){
      setEmailVal(res.data[0].business_email);
    }
    if(res.data[0].instagram !==null){
      setIgVal(res.data[0].instagram);
    }
    if(res.data[0].facebook !==null){
      setFbVAl(res.data[0].facebook);
    }
    if(res.data[0].about_us !== null){
      setDesVal(res.data[0].about_us);
    }        
  }
  
  const handleSubmit = async () => { 
    setOpen(true);   
    await axios.put(`http://localhost:3001/api/vendor/update-reserve`, 
    {id:reservationId, bName: bNameVal, bTel: telValue, email: emailVal, fb: fbVal, ig: igVal, des: desVal});        
  };

  const handleReset = () => {
    setTelValue('');
    setBNameVal('');
    setEmailVal('');
    setFbVAl('');
    setIgVal('');    
    setDesVal('');
    getReservationDetails();
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
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 'auto',  maxWidth: 'lg', justifyContent: 'center' },
      }}
      noValidate
      autoComplete="off"
    >   
    
    <Paper sx={{padding: '1%'}} >
      {rDetails.map((r) =>(
      <Grid container spacing={3} key={r.id}> 
        <Grid item xs={12} sm={12} md={12} lg={12}> 
        {/* <div> */}
          <h2>Stall Reservation</h2>
        {/* </div> */}
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}> 
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
            // value={subjectValue}
            label={r.id}         
          />     
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}> 
        <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='st-input' >
          STALL NO.
        </InputLabel>       
          <TextField 
            id='st-input'
            fullWidth 
            disabled
            // focused
            size='small'         
            // onChange={onSubjectChange}
            value={r.code_name}          
          />     
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='sd-input' >
          START DATE
        </InputLabel>       
          <TextField 
            id='sd-input'
            fullWidth 
            disabled
            // focused
            size='small'         
            // onChange={onSubjectChange}
            value={r.start}          
          /> 
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='ed-input' >
            END DATE
          </InputLabel>       
          <TextField 
            id='ed-input'
            fullWidth 
            disabled
            // focused
            size='small'         
            // onChange={onSubjectChange}
            value={r.end}          
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}> 
          <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='sd-input' >
          BUSINESS NAME*
          </InputLabel>
          <TextField 
            id='s-input'
            fullWidth 
            // focused  
            size='small'       
            onChange={(e) => setBNameVal(e.target.value)}
            value={bNameVal} 
            placeholder={'Enter Business Name'}         
            // InputLabelProps={{ style: { fontSize: '90%' } }}
          />     
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}> 
        <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='em-input' >
          BUSINESS EMAIL
        </InputLabel>       
          <TextField 
            id='em-input'
            fullWidth 
            // focused 
            size='small'        
            onChange={ (e) => setEmailVal(e.target.value)}
            value={emailVal} 
            placeholder={'Enter Email'}                   
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
            onChange={ (e) => setTelValue(e.target.value)}            
            value={telValue}
            placeholder={'Enter Phone Number'}                    
          />     
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='fb-input' >
            FACEBOOK LINK
          </InputLabel>        
          <TextField 
            id='fb-input'
            fullWidth 
            // focused
            size='small'         
            onChange={ (e) => setFbVAl(e.target.value)}
            value={fbVal}  
            placeholder={'Enter FaceBook Link'}          
          />     
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='ig-input' >
            INSTAGRAM LINK
          </InputLabel>        
          <TextField 
            id='ig-input'
            fullWidth 
            // focused 
            size='small'        
            onChange={ (e) => setIgVal(e.target.value)}
            value={igVal} 
            placeholder={'Enter Instagram Link'}         
          />     
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='ca-input' >
            CATEGORY
          </InputLabel>        
          <TextField 
            id='ca-input'
            fullWidth 
            disabled
            // renderInput
            // focused 
            size='small'        
            // onChange={ (e) => setCatVal(e.target.value)}
            value={r.type}         
          />     
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='ds-input' >
            INITIAL DEPOSIT
          </InputLabel>        
          <TextField 
            id='ds-input'
            fullWidth
            disabled 
            // focused 
            size='small'        
            // onChange={onSubjectChange}
            // value={subjectValue}
            value={r.deposit}
            // InputLabelProps={{ style: { fontSize: '90%' } }}
          />     
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='de-input' >
            DESCRIPTION (MAX 360 CHARACTERS)
          </InputLabel>      
          <TextField
            id="de-input"
            fullWidth
            // focused
            size='small'
            // style={{paddingBottom: 20}}
            // multiline
            onChange={ (e) => setDesVal(e.target.value)}
            value={desVal}            
            // rows={4}
            placeholder={"Enter Description"} 
            // InputLabelProps={{ style: { fontSize: '90%' } }}
          />        
        </Grid>
        
        
      </Grid>
      ))}
      </Paper>
      <Grid style={{padding: '2% 0 0 0'}} container spacing={2}>
        <Grid item align="right" display='flex'>
          <div style={{padding: '0 10% 0 0'}}>
            <Button variant='contained' onClick={handleSubmit}>Save</Button>
          </div>
          <div>
            <Button variant='outlined' onClick={handleReset}>Reset</Button>
          </div> 
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Changes is successfully saved!
        </Alert>
      </Snackbar>           
    </Box>   
    
  );
}
