import * as React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {  getMarkets,stalls,createInvoice, updateInvoiceStatus } from '../../../../service/call';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";
import { useForm } from 'react-hook-form';
import {  AutoCompleteFieldController } from '../../../lib/component'
import { useRef } from "react";

import { Autocomplete } from "@mui/material";


import {
    Box,
   
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
  } from '@mui/material';

export default function CreateInvoice() {
    const [openCreate, setOpenCreate] = React.useState(false);
    const [markets, setMarket] = React.useState([]);
    const [stalles, setStall] = React.useState([])
    const[selectMarket, setSelectMarket] = React.useState([])
    const[status, setStatus] = React.useState([])
    const[msg, setMsg]=React.useState([])
    const [snack, setSnack] = React.useState(false);
    const [dMarket, setDMarket] = React.useState(false)
   
    const [values, setValues] = React.useState({
        market: 'San Ignacio Market',
       stall: 'None',
       dueData: "2022-05-24",
       rent:0,
       water:0,
       light:0,
       other:0,
       dDetails:'None',
       total:0

      });
    
       //FORM HOOK 
    const {  control,  watch,  formState: { errors } } = useForm({
        shouldUnregister: true
    });
  
    let marketSelect;
    let stallSelect;
    marketSelect = watch('market')
    
    stallSelect = watch('stall')
    React.useEffect(()=>{
  
        
        getMarket()
        
     
        getStalls()
       
       
      }, []);

      
      const getMarket = async () =>{
        
    
        const res = await getMarkets()
      
        setMarket(res.data)
       
       
        
     }

     const handleSelectMarket = (event,value) =>{
        let isStalls = markets.filter((s) => s.market === event.target.value);
        // isStalls = [...new Set(isStalls.map((item) => item.m_name))]
        console.log(isStalls)
     }


    const handleClickOpen = () => {
        setOpenCreate(true);
      };
    
      const handleClose = (event) => {
        setSnack(false)
        setOpenCreate(false);
        setValues({
            market: 'San Ignacio Market',
            stall: 'None',
            dueDate: '2022-05-24',
            rent:0,
            water:0,
            light:0,
            other:0,
            dDetails:'None',
            total:0
            })
      };
      const handleChange = async (event) => {
      
      
        
        setValues({
            ...values,
            [event.target.name]: event.target.value})

          
            
  
      }
     
   
     const getStalls = async () =>{
     
     
         const res = await stalls()
         console.log(res.data)
        setStall(res.data)
     }
     
    

      const invoiceCreate = async () =>{
          const itotal =  parseFloat(values.rent) + parseFloat(values.water) + parseFloat(values.light) + parseFloat(values.other);
       const data = {...values, total: itotal }
      

          const res = await createInvoice(data)
          try{

            if(res.status === 200){
                setStatus('success')
                setMsg(res.data.msg)
                setSnack(true)
              
              setTimeout(() => handleClose(), 2000)
    
    
            }
          }catch(e){
  
            setStatus('error')
            setMsg("Failed To Create Invoice")
            setSnack(true)
          
          setTimeout(() => handleClose(), 3000)
            
          }


      }

    


     
  
  
    return (
      <div>
          <Button variant="outlined" color="success" onClick={handleClickOpen} > <AddIcon/> Create Invoice  </Button>
          <Dialog
        open={openCreate}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <form
            autoComplete="off"
            noValidate>
            <Card>
                <CardHeader
                subheader="Filled all Fields"
                title="Create Invoice"
                />
                <Divider />
                <CardContent>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                        <AutoCompleteFieldController
                    options={markets.map(el => ({...el, label: (el.m_name )}) )}
                    //errors={errors.product || null}
                    control={control}
                    name="market"
                    label="Market"
                    onChange={handleSelectMarket}
                    rules={{ required: "Market is Required!" }}
                
                />
                
                    {/* <TextField
                        fullWidth
                        label="Select Market"
                        name="market"
                        required
                        select
                        control={control}
                        SelectProps={{ native: true}}
                        value={values.market}
                        onChange={ handleChange}
                        variant="outlined"
                    >
                          {markets.map((option) => (
                  <option
                   
                    value={option.m_name}
                  >
                    {option.m_name}
                  </option>
                ))}
                    </TextField> */}
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                    <TextField
                        fullWidth
                        label="Select Stall"
                        name="stall"
                        onChange={handleChange}
                        required
                        control={control}
                        select
                        SelectProps={{ native: true }}
                        value={values.stall}
                        variant="outlined"
                        
                    >

                        {stalles.map((option) => (
                        <option
                            key={option.code_name}
                            value={option.code_name}
                        >
                            {option.code_name}
                        </option>
                        ))} 
                            
                    </TextField>
                    </Grid>
                    <Grid item md={6}
                    xs={12}>
                     <TextField
                      fullWidth
                        id="date"
                        label="Due Date"
                        type="date"
                        defaultValue="2022-05-24"
                    
                        onChange={handleChange}
                        name="dueDate"
                                        
                                        value={values.dueDate}
                        
                     />
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                       
                    
                    </Grid>
                    <Divider />
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                    <TextField
                        fullWidth
                        label="Rental Fee"
                        name="rent"
                        onChange={handleChange}
                        type="number"
                        value={values.rent}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                   <TextField
                        fullWidth
                        label="Water Fee"
                        name="water"
                        onChange={handleChange}
                        type="number"
                        value={values.water}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                   <TextField
                        fullWidth
                        label="Electricity Fee"
                        name="light"
                        onChange={handleChange}
                        type="number"
                        value={values.light}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                        <TextField
                        fullWidth
                        label="Other Fee Details"
                        name="dDetails"
                        onChange={handleChange}
                        type="text"
                        value={values.dDetails}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                       <TextField
                        fullWidth
                        label="Other Fee"
                        name="other"
                        onChange={handleChange}
                        type="number"
                        value={values.other}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                          <Grid item>  <h3 > Total:</h3> <span name='total'  value={ values.total} onChange={handleChange}>${parseFloat(values.rent) + parseFloat(values.water) + parseFloat(values.light) + parseFloat(values.other)}</span> </Grid>
                       
                    </Grid>
                </Grid>
                </CardContent>
                <Divider />
                <Snackbar open={snack}>
                <  Alert severity={status}>{msg}</Alert>
                </Snackbar>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
                >
                <Button
                    color="success"
                    variant="contained"
                    onClick={ invoiceCreate}
                >
                    <SaveIcon/> Save 
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    onClick={handleClose}
                >
                   <CancelIcon/> Cancel
                </Button>
                </Box>
            </Card>
        </form>
          </DialogContentText>
        </DialogContent>
        
      </Dialog>
      </div>
    );
  }
  