

import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import {red, amber} from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios'
// import { color } from '@mui/system';


// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: orange[700],
//     },
//     secondary: {
//       main: purple[700],
//     },
//   },
// });
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

//reservation id retrieved after vendor login
let rId = 1;  


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      
        <TableRow  sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.invoiceNumber}
          </TableCell>
          <TableCell >{row.total}</TableCell>
          <TableCell >{new Date(row.dueDate).toISOString().slice(0, 10)}</TableCell>
                  
          <TableCell >
            {row.status ==="P" ? <CheckCircleIcon style={{ color: 'green' }}/>: 
              row.status ==="PP" ? <CancelIcon style={{ color: "#f44336" }}/>: 
              <DoNotDisturbOnIcon style={{ color: "#ffb300" }}/>}
          </TableCell> 
          <TableCell>
            <IconButton>
              <SaveAltIcon/>
            </IconButton>
          </TableCell>         
        </TableRow>
     
      <TableRow sx={{borderBottom: 2, borderBottomColor: '#e0e0e0'}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography style={{color: 'grey'}}  gutterBottom component="div">
                Billing Fees
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{color: 'grey'}}>Rental($)</TableCell>                    
                    <TableCell style={{color: 'grey'}}>Water($)</TableCell>                    
                    <TableCell style={{color: 'grey'}}>Electricity($)</TableCell>                    
                    <TableCell style={{color: 'grey'}}>Other($)</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row.RFee}
                        <IconButton variant="contained" >
                          {row.RStat ==="P" ? 
                            <CheckCircleIcon style={{ color: 'green' }}/>: 
                            row.RStat ==="NP" ? <CancelIcon style={{ color: "#f44336" }}/>: 
                            row.RStat==="PP" ? <DoNotDisturbOnIcon style={{ color: "#ffb300" }} />:''
                          }                        
                        </IconButton> 
                      </TableCell>                                           
                      <TableCell >
                        {row.WFee}                          
                        <IconButton variant="contained" style={{marginLeft: '5%' }} >
                          {row.WStat ==="P" ? 
                            <CheckCircleIcon style={{ color: 'green' }}/>: 
                            row.WStat ==="NP" ? <CancelIcon style={{ color: "#f44336" }}/>: 
                            row.WStat==="PP" ? <DoNotDisturbOnIcon style={{ color: "#ffb300" }} />:''
                          }                        
                        </IconButton>                                              
                      </TableCell>
                      
                      <TableCell > 
                        {row.EFee}
                        <IconButton variant="contained" style={{ marginLeft: '5%' }} >
                          {row.EStat ==="P" ? 
                            <CheckCircleIcon style={{ color: 'green' }}/>: 
                            row.EStat ==="NP" ? <CancelIcon style={{ color: "#f44336" }}/>: 
                            row.EStat==="PP" ? <DoNotDisturbOnIcon style={{ color: "#ffb300" }} />:''
                          }                        
                        </IconButton>                        
                      </TableCell>                      
                      <TableCell >
                        {row.OFee}
                        <IconButton variant="contained" style={{ marginLeft: '5%' }} >
                          {row.OStat ==="P" ? 
                            <CheckCircleIcon style={{ color: 'green' }}/>: 
                            row.OStat ==="NP" ? <CancelIcon style={{ color: "#f44336" }}/>: 
                            row.OStat==="PP" ? <DoNotDisturbOnIcon style={{ color: "#ffb300" }} />:''
                          }                        
                        </IconButton> 
                      </TableCell>                     
                    </TableRow>                  
                </TableBody>
                
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    month: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    BStat: PropTypes.string.isRequired,
    RFee: PropTypes.number.isRequired,
    RStat: PropTypes.string.isRequired,
    WFee: PropTypes.number.isRequired,
    WStat: PropTypes.string.isRequired,
    EFee: PropTypes.number.isRequired,
    EStat: PropTypes.string.isRequired,
    OFee: PropTypes.number.isRequired,
    OStat: PropTypes.string.isRequired,
  }).isRequired,
};

export default function BillingInfo() {
  const [reservation, setReservation] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [invoice, setInvoice] = React.useState([]);
  const [dateValue, setDateValue] = React.useState(); 
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    getInvoice();
  }, [])

  const getInvoice = async () => {
    let username = localStorage.getItem('username')
    const res = await axios.post(`http://localhost:3001/api/vendor/invoice-reserve`, {username:username})    
    setInvoice(res.data)        
  }

  React.useEffect(() => {
    getReservation();
  }, [])

  const getReservation = async () => {
    let username = localStorage.getItem('username')
    const res = await axios.post(`http://localhost:3001/api/vendor/bill-end`,{username:username})    
   
    
    setReservation(res.data)        
  }

  const handleChange = (newValue) => {
    setDateValue(newValue);
    // console.log(newValue)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const handleSave = async () => {
    setOpen(false);
   
    let username = localStorage.getItem('username')
    let vdata ={}
    vdata.username = username
    vdata.endDate =new Date(dateValue).toISOString().slice(0, 10)
    await axios.put(`http://localhost:3001/api/vendor/update-reserve-date`, {...vdata})    
    //refresh order data list
    getReservation() 
  }
  return (
    <React.Fragment>
    <Paper>
    <Box sx={{paddingBottom:3, borderBottom:2, borderBottomColor: '#e0e0e0',  flexGrow: 1 }}>
      {/* top section */}
      <Grid container spacing={2}>        
        <Grid item lg={4} md={4} xs={12}> 
          <Box pl={4} textAlign="left" style={{color: 'grey'}}>
            Billing Information
          </Box>
        </Grid>
        <Grid item lg={4} md={4} xs={12}> 
          <div style={{color: 'grey'}}>Reservation Expiry Date</div> 
         <div>  {reservation.end} </div>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Button variant="contained" size="medium" onClick={handleClickOpen}> 
          Change plan 
          </Button>
        </Grid>        
      </Grid>
      
    </Box>
    {/* </Paper> */}
    <Box  pt={3} pl={4} textAlign="left" style={{color: 'grey'}}>Invoices</Box>
    {/* <Paper> */}
    <TableContainer >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{color: 'grey'}}>Invoice Number</TableCell>
            <TableCell style={{color: 'grey'}}>Amount ($)</TableCell>
            <TableCell style={{color: 'grey'}}>Billing Due Date</TableCell>
           
            <TableCell style={{color: 'grey'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>       
          {invoice
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <Row key={row.id} row={row} />
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={invoice.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </Paper>

    {/* popout dialog box to change reservation expiry date */}
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        {/* <DialogTitle>Fill the form</DialogTitle> */}
        <DialogContent>
          {/* <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack component="form" noValidate spacing={3}>
              <DatePicker
              // disableFuture
              label="New Expiry Date"
              openTo="year"
              views={['year', 'month', 'day']}
              value={dateValue}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />     
              {/* <TextField
                id="date"
                label="New Expiry Date"
                type="date"
                format=""
                // defaultValue="2017-05-24"  
                defaultValue={dValue}              
                // value={dValue}
                onChange={handleChange}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
            </Stack>
            </LocalizationProvider>
          {/* </Box> */}
        </DialogContent>
        <DialogActions>          
          <Button onClick={handleClose}>Cancel</Button>  
          <Button onClick={handleSave}>Save</Button>        
        </DialogActions>
      </Dialog>
    </React.Fragment> 
  );
}




