import React, {forwardRef, useState} from 'react';
import Button from '@mui/material/Button';
import {TextField, Box, Paper, Grid} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

//user_Id stored after login
let user_Id = 2;

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Inquiry() {
  const [textValue, setTextValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [dateValue, setDateValue] = useState(new Date().toISOString().slice(0, 10));
  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  
  const handleSubmit = () => {
   if(textValue !== '' || subjectValue !==''){
     let user = localStorage.getItem('username')
     let sendData = {
        username: user,
        subject: subjectValue,
        date:dateValue,
        detail: textValue
     }
     console.log(sendData)
     axios.post('http://localhost:3001/api/vendor/create-inquiry', 
    {...sendData}); 
    setTextValue("");
    setSubjectValue("");
    setOpen(true);
    }else{
      setOpenWarning(true);
    }   
  };

  const handleReset = () => {
    setTextValue("");
    setSubjectValue(""); 
    setDateValue(new Date());   
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpenWarning(false)
  };
  
  return (    
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 'auto',  maxWidth: 'sm', justifyContent: 'center' },
      }}
      noValidate
      autoComplete="off"
    >  
    <Paper sx={{padding: '2%'}}> 
    <Grid container spacing={2}> 
    <Grid item xs={12} sm={12}> 
      {/* <div> */}
        <h2>Send Inquiry</h2>      
    </Grid>
    <Grid item xs={12} sm={12}>       
        <TextField
          fullWidth
          
          onChange={(e) => setSubjectValue(e.target.value)}
          value={subjectValue}
          label={"Subject"} //optional
        />      
    </Grid>
    <Grid item xs={12} sm={12}>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>   
          <DatePicker
            // disableFuture
            label="Date"
            disabled            
            value={dateValue}
            dateFormat="YYYY-MM-DD"            
            renderInput={(params) => 
                <TextField fullWidth  {...params} />}
          />             
        </LocalizationProvider>
        
      </div>
      </Grid>
      <Grid item xs={12} sm={12}>
      <div>
        <TextField
          // id="outlined-textarea"
          fullWidth
          // style={{paddingBottom: 20}}
          multiline
          onChange={(e) => setTextValue(e.target.value)}
          value={textValue}
          rows={4}
          label={"Message"} //optional
        />
      </div>
      </Grid>     
      </Grid>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} >
          <Button variant='contained' onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleReset}>Reset</Button>
        </Grid> 
      </Grid>   

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Inquiry is successfully sent!
        </Alert>
      </Snackbar>   
      <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Fields cannot be empty!
        </Alert>
      </Snackbar>     
    </Box>   
  );
}