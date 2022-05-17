import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import {   stallsInToledo, viewStallByCode, updateStall} from '../../../../service/call';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import PreviewIcon from '@mui/icons-material/Preview';
import Grid from '@mui/material/Grid';
import { SeverityPill } from './util';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";
import CardMedia from '@mui/material/CardMedia';
import {
  Box,
 
  Card,
  CardContent,
  CardHeader,
  Divider,
  
  TextField
} from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
export default function CayoTable() {
    
   
    const [search, setSearch] = React.useState([]);
    
    const[viewStalls, setViewStall] =React.useState([])
    const [openView, setOpenView] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false)
    const [updateStalls, setUpdateStall] = React.useState([{stall:'', sstatus:'',fee:0}])
   const[stalls, setStall] =React.useState([])
    const[status, setStatus] = React.useState([])
    const[msg, setMsg]=React.useState([])
    const [snack, setSnack] = React.useState(false);

    
      
    React.useEffect(()=>{
  
        
      
        getStall()
       
      }, []);

     

     const getStall = async () =>{
        const res = await stallsInToledo()
      
        setStall(res.data)
     }

     const handleSearch = () =>{

        const filteredRows = stalls.filter((row) => {
            return row.Stall.toLowerCase().includes(search.toLowerCase());
          });
          setStall(filteredRows);
        
        
     }
    const cancelSearch = () =>{
        setSearch("")
        getStall()
    }
      
    const handleClose = () => {
      setOpenView(false);
      
      
    };
    const handleClickOpen = () => {
      setOpenView(true);
    }

    const handleCloseEdit = (event) => {
      setEditOpen(false);
      setSnack(false)
      getStall()
      setUpdateStall({stall:'', sstatus:''})
     
    };
   
    const updateStallData = async(e) =>{
     
      let stallid = document.getElementById('stalluid').innerHTML ;
    let data = {...updateStalls, stall:stallid}
    console.log(data)
      

    
     const res = await updateStall(data)
     
      try{

        if(res.status === 200){
            setStatus('success')
            setMsg(res.data.msg)
            setSnack(true)
          
          setTimeout(() => handleCloseEdit(), 2000)
          

        }
      }catch(e){

        setStatus('error')
        setMsg("Failed To Update Stall")
        setSnack(true)
      
      setTimeout(() => handleCloseEdit(), 3000)
      
        
      }


    
    }
    const handleClickOpenEdit = () => {
      setEditOpen(true);
    }
   
    const viewStall = async (stall) =>{

      handleClickOpen()
      const res = await viewStallByCode(stall)
      setViewStall(res)
      

    }

    const editStall = async (stall) =>{

      handleClickOpenEdit()
      const res = await viewStallByCode(stall)
      setViewStall(res)
    

    }

    const handleEditChange = (e) =>{

      setUpdateStall({ ...updateStalls,
        [e.target.name]: e.target.value})
      
    }

  
  
    return (
      <div>
          <Grid container justifyContent="flex-start"> 
            <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Search by Stall Name </InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type='text'
                value={search}
                    onChange={ (e) => setSearch(e.target.value) }
                   
            
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSearch}
                    edge="end"
                    >
                        <SearchIcon/>
                    </IconButton>
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={cancelSearch}
                   
                    >
                    <CloseIcon/>
                    </IconButton>
                </InputAdornment>
                }
                label="Search By Stall Name"
            />
            </FormControl>
        </Grid>        
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Stall Name</StyledTableCell>
                <StyledTableCell align="left">Market Name</StyledTableCell>
                <StyledTableCell align="left">Fee</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {stalls.map((stall,index) => (
                <StyledTableRow >
                <StyledTableCell component="th" scope="row">
                    {stall.Stall}
                </StyledTableCell>
                <StyledTableCell align="left">{stall.market}</StyledTableCell>
                <StyledTableCell align="left">{stall.fee}</StyledTableCell>
                
                <StyledTableCell align="left"><SeverityPill
                    color={(stall.status === 'Available' && 'success')
                    || (stall.status === 'Unavailable' && 'error')
                    || 'warning'}
                  >{stall.status}</SeverityPill></StyledTableCell>
                   <StyledTableCell align="left">{stall.description}</StyledTableCell>
                <StyledTableCell align="left"> <Button spacing="2" color="info" variant="contained" onClick={()=>editStall(stall.Stall)}><EditIcon/></Button><Button color="warning" variant="contained" onClick={() => viewStall(stall.Stall)}><PreviewIcon/></Button>
 </StyledTableCell>
                
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
 {/* View Dialog */}
    <Dialog
        open={openView}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Card>
                <CardHeader
               
                title = {'Stall View'}
                />
                <Divider />
                <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                   <Grid
                    item
                    md={6}
                    xs={12}
                    >
                       <Grid item>
                       <Typography display="inline"variant="h6" gutterBottom component="div">
                      Stall Name
                      </Typography>
                      <Typography display="inline" variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                          -   {viewStalls.stall}
                      </Typography>
                      
                       </Grid>
                     
                     
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                       <Grid item>
                       <Typography display="inline"variant="h6" gutterBottom component="div">
                       Status:
                      </Typography>
                      <Typography display="inline" variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                           <SeverityPill
                              color={(viewStalls.status === 'Available' && 'success')
                              || (viewStalls.status === 'Unavailable' && 'error')
                              || 'warning'}
                            >{viewStalls.status}</SeverityPill>
                      </Typography>
                      
                       </Grid>
                     
                     
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                       <Grid item>
                       <Typography display="inline"variant="h6" gutterBottom component="div">
                       Fee:
                      </Typography>
                      <Typography display="inline" variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                       ${viewStalls.fee}
                      </Typography>
                      
                       </Grid>
                     
                     
                    </Grid>

                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                       <Grid item>
                       <Typography display="inline"variant="h6" gutterBottom component="div">
                       Market:
                      </Typography>
                      <Typography display="inline" variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                            {viewStalls.market}
                      </Typography>
                      
                       </Grid>
                     
                     
                    </Grid>
                    <Grid
                    item
                    md={8}
                    xs={12}
                    >
                       <Grid item>
                       <Typography display="inline"variant="h6" gutterBottom component="div">
                       Description:
                      </Typography>
                      <Typography display="inline" variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                            {viewStalls.description}
                      </Typography>
                      
                       </Grid>
                     
                     
                    </Grid>

                    <Grid
                    item
                    md={8}
                    xs={12}
                    >
                       <Grid item>
                       <CardMedia
                            component="img"
                            height="200"
                            image={`http://localhost:3001/${viewStalls.stallimg}`}
                            alt="Stall Image"
                        />
                      
                       </Grid>
                     
                     
                    </Grid>
                   
                   
                   
                    
                    
                </Grid>
                </CardContent>
                <Divider />
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
                >
               
                <Button
                    color="error"
                    variant="contained"
                    onClick={handleClose}
                >
                    Close
                </Button>
                </Box>
                </Card>
          </DialogContentText>
        </DialogContent>
        
      </Dialog>

      {/* Edit Dailog */}
      <Dialog
         open={editOpen}
         onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Card>
                <CardHeader
               
                title = {'Stall Edit'}
                />
                <Divider />
                <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                   <Grid
                    item
                    md={6}
                    xs={12}
                    >
                       <Grid item>
                       <Typography display="inline"variant="h6" gutterBottom component="div">
                      Stall Name: 
                      </Typography>
                      <Typography id="stalluid" display="inline" variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                        {viewStalls.stall}
                      </Typography>
                      
                       </Grid>
                     
                     
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                       <Grid item>
                       <Typography display="inline"variant="h6" gutterBottom component="div">
                       Status:
                      </Typography>
                     
                      <TextField
                       key={viewStalls.status}
                       label="Update Status"
                       name="sstatus"
                      defaultValue={viewStalls.status}
                       required
                       select
                       SelectProps={{ native: true}}
                      value={updateStalls.fee}
                       onChange={handleEditChange}
                       variant="outlined"
                     
                   >
                        <option value="Available">
                           Available
                        </option>
                        <option value="Unavailable">
                          Unavailable
                        </option >
    
                   </TextField>
                       </Grid>
                     
                     
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                       <Grid item>
                       <Typography display="inline"variant="h6" gutterBottom component="div">
                       Fee:
                      </Typography>
                    
                      <TextField
                        fullWidth
                        label="Rental Fee"
                        name="fee"
                        key={viewStalls.fee}
                        onChange={handleEditChange}
                        type="number"
                       defaultValue={viewStalls.fee}
                        value={updateStalls.fee}
                        variant="outlined"
                    />
                      
                       </Grid>
                     
                     
                    </Grid>

                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                       <Grid item>
                       <Typography display="inline"variant="h6" gutterBottom component="div">
                       Market:
                      </Typography>
                      <Typography display="inline" variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                            {viewStalls.market}
                      </Typography>
                      
                       </Grid>
                     
                     
                    </Grid>
                    <Grid
                    item
                    md={8}
                    xs={12}
                    >
                       <Grid item>
                       <Typography display="inline"variant="h6" gutterBottom component="div">
                       Description:
                      </Typography>
                      <Typography display="inline" variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                            {viewStalls.description}
                      </Typography>
                      
                       </Grid>
                     
                     
                    </Grid>
                  
                   
                   
                   
                   
                    
                    
                </Grid>
                </CardContent>
                <Divider />
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
                >
                <Button
                    color="warning"
                    variant="contained"
                   onClick={updateStallData}
                >
                    Update 
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    onClick={handleCloseEdit}
                >
                    Close
                </Button>
                </Box>
                </Card>
          </DialogContentText>
        </DialogContent>
        
      </Dialog>
      <Snackbar open={snack}>
        <  Alert severity={status}>{msg}</Alert>
      </Snackbar>
      
      </div>
    );
  }