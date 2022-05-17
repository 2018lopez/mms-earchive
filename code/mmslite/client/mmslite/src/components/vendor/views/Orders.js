// import * as React from 'react';
// instal dependencies:
// npm i @mui/x-data-grid
// npm i axios
import { useState, useEffect} from 'react'
import { DataGrid, GridActionsCellItem, GridToolbar} from '@mui/x-data-grid';
import {red, amber} from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { RenderCellExpand } from '../components/RenderCellExpand';

import EditLocationRoundedIcon from '@mui/icons-material/EditLocationRounded';
import axios from 'axios';
import Title from '../components/Title';

let rId = 1; //reservation id 
let customerName;
let customerTotal;
let customerNo;
let statusId;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

/*********************Start of function Order Table*************************** */
export default function OrderTable() {
  //button colors used in Status column
  const theme = createTheme({
    palette: {
      cancelColor: {
        // light: '#757ce8',
        //deepOrange
        main: red[500],
        // dark: '#002884',
        contrastText: '#fff',
      },
      pendingColor: {
        // light: '#ff7961',
        main: amber[600],
        // dark: '#ba000d',
        // contrastText: '#000',
      },
    },
  });


  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [pageSize, setPageSize] = useState(5);
  //store order data list
  const [orders, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [open, setOpen] = useState(false); //for Details button dialog
  const [open2, setOpen2] = useState(false); //for order status dialog
 
  const [status, setStatus] = useState('');
 
  useEffect(() => {
    getOrders()
  }, [])
  
  const getOrders = async () => {
    let username = localStorage.getItem('username')
    const res = await axios.post(`http://localhost:3001/api/vendor/orders`,{username:username})    
    setOrder(res.data)    
  }

  //retrieve row id and new status value after update
  const updateOrder = async(id, stat) => { 
    // send updates to database with item id and item value 
    await axios.put(`http://localhost:3001/api/vendor/update-order`, {status: stat, id:id})    
    // refresh order data list
    getOrders()      
  }

  //retrieve data after editing status column in table
  const handleCommmit = (e) =>{    
    updateOrder(e.id, e.value)  
  };  
  
  //open dialog and get ordered items
  const orderDetails = async(id) => {
    const res = await axios.post(`http://localhost:3001/api/vendor/order-details`, {id:id})    
    setOrderItems(res.data)      
    
    orders.map(row =>{
      if(id === row.id){ //stores
        customerName = row.name;
        customerTotal =row.total;
        customerNo = row.contact_no;
      }
      return '';      
    })   
    setOpen(true);
  } 

  
  const editStatus =(id)=>{
    statusId = id;
    setStatus('');
    setOpen2(true);
  }

  const handleClose = () =>{setOpen(false); setOpen2(false);}; //for Details button dialog
  const handleSave = () =>{
    setOpen2(false);
    updateOrder(statusId, status);
  }

  //column headers and column format
  const columns = [ 
    { field: 'id', headerName: 'Order ID', minWidth: 150, }, 
    { field: 'name', headerName: 'Customer Name', minWidth: 150, type: 'string' },
    { field: 'mode', headerName: 'Delivery Mode', minWidth: 150, type: 'string' },
    { field: 'date', headerName: 'Order Date', minWidth: 150, type: 'date' },
    { 
      field: 'message', headerName: 'Chat', minWidth: 150,
      type: 'string', renderCell: RenderCellExpand,
    },
    {
      field: 'status', headerName: 'Order Status', minWidth: 150,
      align: 'right', headerAlign: 'center', type: 'singleSelect',
      // description: "Double click to edit",        
      valueOptions:['Confirmed', 'Cancelled', 'Pending'],
      renderCell: (params) => (
        <ThemeProvider theme={theme}> 
          {params.value}         
          <IconButton
          variant="contained"
          color={params.value ==="Confirmed" ? "success": 
                params.value ==="Cancelled" ? "cancelColor": "pendingColor"}
          size="small"
          style={{ marginLeft: 16 }}
          onClick={()=>editStatus(params.id)}
          >
            <EditLocationRoundedIcon/>
            </IconButton>
        </ThemeProvider>
      ),        
      editable: true,         
    },
    {
      field: 'actions', minWidth: 150, align: 'left',
      align: 'right', type: 'actions',
      getActions: (params) => [   
        <GridActionsCellItem
        icon={<Button variant="contained" color="primary">
                Details
              </Button>}
        // label="Delete"
        onClick={()=>orderDetails(params.id)}
        /> ,               
        // </GridActionsCellItem>,         
        // <GridActionsCellItem
        //   icon={<EditLocationRoundedIcon/>}
        //   label="Double click to update"            
        //   showInMenu
        // />,          
        // <GridActionsCellItem
        //   icon={<DeleteIcon />}
        //   label="Delete"
        //   onClick={()=>deleteOrder(params.id)}
        // />,   
      ],
    },
  ]  
  //for dialog
  //Table contain order data\

  return (  
      
    <div style={{ height: 400, width: '100%' }}>
      <Title>Orders</Title>      
      <DataGrid
        rows={orders}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize)=>setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}        
        localeText={{
          toolbarDensity: 'Size',
          toolbarDensityLabel: 'Size',
          toolbarDensityCompact: 'Small',
          toolbarDensityStandard: 'Medium',
          toolbarDensityComfortable: 'Large',
        }}
        components={{Toolbar: GridToolbar}}        
        onCellEditCommit={handleCommmit}
        initialState={{ pinnedColumns: {right: ['actions'] } }}
        // disableColumnSelector
        disableColumnMenu        
        // disableSelectionOnClick
      >         
      </DataGrid>      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {customerName}({customerNo})
        </DialogTitle>        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TableContainer component={Paper}>
              <Table sx={{ width: '100%' }} aria-label="spanning table">
                <TableHead>                  
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Details
                    </TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell sx={{fontWeight: 'bold'}}>Product Name</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} align="right">Qty.</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} align="right">Unit</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} align="right">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.PName}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{ccyFormat(row.quantity*row.price)}</TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell sx={{fontWeight: 'bold'}} colSpan={2}>Total ($)</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} align="right">{customerTotal}</TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
          
      <Dialog
        open={open2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Order Status</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                <FormControlLabel value="Confirmed" control={<Radio />} label="Confirm" />
                <FormControlLabel value="Cancelled" control={<Radio />} label="Cancel" />
              </RadioGroup>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>          
          <Button variant='contained' color='primary' onClick={handleSave} autoFocus>Save</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
           
    </div>
  )
}
