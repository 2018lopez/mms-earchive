import * as React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {  getMarkets,stalls,createInvoice, updateInvoiceStatus,createStall } from '../../../../service/call';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";
import { useForm } from 'react-hook-form';
import {  AutoCompleteFieldController } from '../../../lib/component'
import axios from 'axios'

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
    const[status, setStatus] = React.useState([])
    const[msg, setMsg]=React.useState([])
    const [snack, setSnack] = React.useState(false);
    
    const [values, setValues] = React.useState({
        market: 'San Ignacio Market',
        stall: 'None',
        fee: 0,
        description:'None',
        image:''

    });
    
       //FORM HOOK 
    const {  control,  watch,  formState: { errors } } = useForm({
        shouldUnregister: true
    });
  
    let marketSelect;
    let stallSelect;
    let fileHandler;
    marketSelect = watch('market', 'San Ignacio Market')
    stallSelect = watch('stall')

    React.useEffect(()=>{

        getMarket()
       
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
            fee: 0,
            description:"None",
            image:''
         
            })
      };

     

      const handleChange = async (event) => {
      
        
        
        
        setValues({
            ...values,
            [event.target.name]: event.target.value})
    
            setValues({
              ...values,
              image: event.target.files[0]})
  
         
             
          
            
        //     setSelectMarket({[values.market] : event.target.value})
        //    let sMarket = Object.keys(selectMarket)
        //    nMarket = sMarket.toString()
          
    
        // const res = await stalls(selectMarket.m_name)
        // setStall(res.data)

      }
     
     
   
     
    

   const stallCreate = async () =>{

     //test
     let vimage = values.image
    
    
      let marketN =  marketSelect.m_name
      // let kimage =  values.image.replace("C:\\fakepath\\", "")
      
      let vdata =  {...values, market: marketN}
      const formData = new FormData();
     formData.append('image',values.image )
     formData.append('fee', values.fee)
     formData.append('description', values.description)
     formData.append('stall', values.stall)
     formData.append('market', vdata.market)

      console.log('Create:', vdata, fileHandler)
      const res = await createStall(formData)
          try{

            if(res.status === 200){
                setStatus('success')
                setMsg(res.data.msg)
                setSnack(true)
              
              setTimeout(() => handleClose(), 2000)
    
    
            }
          }catch(e){
  
            setStatus('error')
            setMsg("Failed To Create Stall")
            setSnack(true)
          
          setTimeout(() => handleClose(), 3000)
            
          }


      }
    
     


     
  
  
    return (
      <div>
          <Button variant="outlined" color="success" onClick={handleClickOpen} > <AddIcon/> Create Stall  </Button>
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
                title="Create Stall"
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
                    
                        </Grid>
                    <Grid
                    item
                    md={6}
                    xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Stall Name"
                            name="stall"
                            onChange={handleChange}
                            required
                            type="text"

                            value={values.stall}
                            variant="outlined"
                            
                        />

                        
                    </Grid>

                    <Grid item md={6}
                    xs={12}>
                      <TextField
                        fullWidth
                        label="Rental Fee"
                        name="fee"
                        onChange={handleChange}
                        type="number"
                        value={values.fee}
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
                        label="Description"
                        name="description"
                        onChange={handleChange}
                        multiline

                        rows={2}
                        
                        value={values.description}
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
                        
                        name="image"
                        onChange={handleChange}
                        type="file"
                       
                        variant="outlined"
                    />
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
                    onClick={ stallCreate}
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
  