import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Fragment } from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { CartContext } from './context/CartContext';


import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ItemCount from './ItemCount'

const ProductDetail = ({ id, title, price, description,stock}) => {
const { addItemToCart, isInCart } = useContext(CartContext);
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const imgPath = `http://localhost:3001/uploads/marketView.png`;
  const navigate = useNavigate();
  const handleReturn = () => navigate(-1);
  const handleAddItemToCart = (quantity) => {
    if (isInCart(id) || quantity === 0) return;

    addItemToCart({ id, title, price, quantity });
    // setShowSuccessBar(true);
  };

  
React.useEffect(()=>{

       
    CheckData()
  
}, []);


    const CheckData = () =>{
        console.log(id, title, price, description, stock)
    }
  return (
    <>
    <Box margin={5}>
      <Grid
        container
        mt={5}
        className='animate__animated animate__fadeIn'
        spacing={3}
      >
        <Grid
          item
          sm={6}
          md={4}
          className='animate__animated animate__fadeInLeft'
        >
          <Card raised>
            <CardMedia component='img' image={imgPath} alt={id} />
          </Card>
          <Box
            display='flex'
            justifyContent='space-between'
            mt={1}
            alignContent='center'
          >
            
            <Button startIcon={<ArrowBackIcon />} onClick={handleReturn}>
             Back
            </Button>
            <Typography component='h5' color="success.main" variant='h6' textAlign='center'>
              ${price}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={8}>
          <Typography component='h1' color="success.main" textAlign='center' gutterBottom>
            {title}
          </Typography>
          <Divider />
          <Paper elevation={8} sx={{ my: 3 }}>
                <List>
               
                   
                    <ListItem>
                        <Typography variant='caption' component='p'>
                            <b>Description</b> : {description}
                        </Typography>
                    </ListItem>
                  
                    
             
                </List>
        </Paper>
          <Divider sx={{ mb: 2 }} />

          <Box display='flex' justifyContent={'center'} my>
            {isInCart(id) ? (
              <Button
                variant='contained'
                color='error'
                startIcon={<AssignmentTurnedInIcon />}
                component={Link}
                to='/cart'
              >
                Terminar mi compra
              </Button>
            ) : stock > 0 ? ( 
              <ItemCount stock={stock} onAdd={handleAddItemToCart} />
            ) : (
              <Typography variant='h6' color='textSecondary'>
                Out of Stock
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      {/* {showSuccessBar && (
        <SuccessSnackbar message={'Producto agregado al carrito'} />
      )} */}

    </Box>
    </>
  );
};

export default ProductDetail;