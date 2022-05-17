import * as React from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import {TextField, Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {  createProduct } from '../../../service/call';
//retrieved after vendor login
let reservationId = 1;
let add;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Input = styled('input')({
  display: 'none',
});

export default function Product() {
  const [products, setProduct] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSuccess, setOpenSuccess] = React.useState(false)
  const [openWarning, setOpenWarning] = React.useState(false);
  const [id, setId] = React.useState('');
  const [code, setCode] = React.useState('');
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [currentId, setCurrentId] = React.useState('');
  const [productImg, setProductImg] = React.useState({ image:''});
  const [productlists, setProductList] = React.useState([])
  const [pImg, setPImg]=React.useState([])
  React.useEffect(()=>{
    getProducts();    
  }, []);

  const getProducts = async () => {
    let username = localStorage.getItem('username')
    const res = await axios.post(`http://localhost:3001/api/vendor/product-vendor`, {username: username});
    setProduct(res.data)
    
    setName(res.data[0].product)
    setPrice(res.data[0].price)
    setDescription(res.data[0].detail)
    setStatus(res.data[0].status)
    setCode(res.data[0].code)
 
  }

  const handleChange = async (event) => {
      
        
        
        
    

        setProductImg({ ...productImg, image: event.target.files[0]})

     
         


  }

  const handleSave = async() => {  

      let username = localStorage.getItem('username')
    const formData = new FormData();
    formData.append('image', productImg.image)
    formData.append('username',username )
    formData.append('pCode', code)
    formData.append('pName', name)
    formData.append('image', productImg)
    formData.append('pStatus', status)
    formData.append('price', price)
    formData.append('details', description)

    const res = await createProduct(formData);

    console.log(formData, productImg, status)

    if(code === '' || name === '' || price === ''){
      setOpenWarning(true)
    }

    try{
      if( res.status === 200){
        setOpenSuccess(true);
        setOpen(false)
        
      }
    }catch(e){
        
      
   
      setOpen(false);        
    
    }
  };

  const handleCancel = () => {
    setOpen(false)
    setId('');
    setCode('');
    setName('');
    setPrice('');
    setStatus('');
    setDescription('');
    // setAdd(true)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenWarning(false)
  };

  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentId(id)
    if(add){
      add=false
    }
    products.map(p =>{
      if(p.id === id){
        setId(p.id);
        
        setCode(p.code)
        setName(p.product);
        console.log(p.product+'menu')
        if(p.price !== null){
          setPrice(p.price);
        }
        if(p.status !== null){
          setStatus(p.status)
        }
        if(p.detail !== null){
          setDescription(p.detail)
          console.log(p.detail)
        }     
        setPImg(p.image)   
      }
      return ''
    })    
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
   
  };

  const handleClickAdd = () => {
    add = true;    
    setId('');
    setCode('');
    setName('');
    setPrice('');
    setStatus('');
    setDescription('');
    setOpen(true);
  }

  const handleClickMenuEdit = () => {
    handleCloseMenu();    
    setOpen(true);
  };

  const handleClickName=(id)=>{
    products.map(p => {
      if(p.id===id){
        setCurrentId(p.id);
        setName(p.product);
        setPrice(p.price);
        setDescription(p.detail);
        setPImg(p.image)
      }
      return '';
    })
  };

  return (
    <React.Fragment>      
    <Box sx={{  maxWidth: '50%', height: '90vh' }}>
      <Grid  container spacing={2} sx={{height: '100%', flexWrap: 'nowrap'}}>
        
        <Grid item lg={6}>
        <Paper sx={{padding: '0 3% 0 3%', height:'100%' }}>
          <List>
            <ListItem>
            <ListItemText primary="Products"/>
            <IconButton 
              color="primary" 
              aria-label="add" 
              onClick={handleClickAdd}
            >
              <AddIcon/>
            </IconButton>
            </ListItem>
          </List>
            <List component="div" role="group">
              {products.map(r =>(                 
              <ListItem
                sx={{bgcolor: '#e0e0e0', borderRadius: 2, padding: 0, mb: '2%'}}                
                key={r.id}
                // aria-haspopup="true"                               
                secondaryAction={
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    edge='end'                    
                    size='small'
                    sx={{ borderRadius: 2, padding: '50% 30%'}}
                    aria-controls={openMenu ? 'basic-menu' : undefined}
                    aria-expanded={openMenu ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={(e)=>handleClickMenu(e, r.id) }
                  >
                    <MoreVertIcon/>                    
                  </IconButton>                   
                }
              >        
                 
                <ListItemButton>
                <Menu
                
                  id="basic-menu"                  
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}                  
                >
                  <MenuItem onClick={() => handleClickMenuEdit()}>Edit</MenuItem>
                  <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
                </Menu>  
                <ListItemText 
                  primary={r.product}  
                  onClick={()=>handleClickName(r.id)}
                /> 
                 
                </ListItemButton>                
              </ListItem> 
              ))}       
            </List>
          </Paper>
        </Grid>        
        <Grid item lg={6}>
          <Paper sx={{width: '100%', height:'100%', bgcolor: 'white' }}>
            <List>
              <ListItem>
              <ListItemText primary="Product Details"/>              
              </ListItem>
            </List>
            <Grid alignItems={'center'}  container sx={{ flexWrap: 'nowrap'}}>
              <Grid  item xs={5} md={5} lg={5} pl={1}>
                <List >
                  <ListItem >
                <img 
                  width={50}
                  height={45} 
                  alt= 'img' 
                  src={`http://localhost:3001/${pImg}`}
                />
                </ListItem>
                </List>
              </Grid>
              <Grid item xs={7} md={7} lg={7}>
                <List >                  
                    <div style={{textAlign: 'left', }}>{name} </div>                 
                    <div style={{textAlign: 'left', color: '#2196f3' }}>${price}</div>                  
                    <div style={{textAlign: 'left', fontSize: '80%', color: 'grey'}}>{description} </div>                  
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Grid>  
      </Grid>           
    </Box>

    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"      
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{add?'Add Product':'Edit Product'}</DialogTitle>
      <DialogContent dividers id='alert-dialog-description'>
        <Grid  container spacing={2}>
         
          <Grid item xs={12} sm={6} md={6} lg={6}> 
            <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='co-input' >
              CODE*
            </InputLabel>       
              <TextField 
                id='co-input'
                fullWidth 
                // disabled
                // focused
                size='small' 
                placeholder='Enter code'        
                onChange={(e) => setCode(e.target.value)}           
                value = {code}          
              />     
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}> 
            <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='pn-input' >
              PRODUCT NAME*
            </InputLabel>       
              <TextField 
                id='pn-input'
                fullWidth 
                // disabled
                // focused
                size='small'
                placeholder='Enter product name'         
                onChange={(e) => setName(e.target.value)}           
                value = {name}         
              />     
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}> 
            <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='pr-input' >
              PRICE*
            </InputLabel>       
              <TextField 
                id='pr-input'
                fullWidth 
                // disabled
                // focused
                size='small'
                placeholder='Enter product price'         
                onChange={(e) => setPrice(e.target.value)}           
                value = {price}         
              />     
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}> 
            <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='st-input' >
              STATUS
            </InputLabel>       
              <TextField 
                id='st-input'
                fullWidth 
                // disabled
                // focused
                size='small'
                placeholder='Enter status'         
                onChange={(e) => setStatus(e.target.value)}           
                value = {status}           
              />     
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={8}>
          <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='st-input' >
              Product Image
            </InputLabel>  
          <TextField
                        fullWidth
                        
                        name="image"
                        onChange={handleChange}
                        type="file"
                    
                        variant="outlined"
                    />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}> 
            <InputLabel sx={{fontSize: '70%'}} align='left' htmlFor='dc-input' >
              DESCRIPTION (Max 100 characters)
            </InputLabel>       
              <TextField 
                id='dc-input'
                fullWidth 
                // disabled
                // focused
                placeholder='Enter description'
                size='small'         
                onChange={(e) => setDescription(e.target.value)}           
                value = {description}          
              />     
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant='outlined' onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant='contained' onClick={handleSave}>Save</Button>
      </DialogActions>
       
    </Dialog>
    <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Product is successfully saved!
        </Alert>
      </Snackbar>   
      <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Fields names with * cannot be empty!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
