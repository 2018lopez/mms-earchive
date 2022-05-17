import * as React from 'react'
import ProductsCard from './comp/Product'
import ProductList from './comp/ProductList'
import { useLocation } from "react-router-dom";
import {Box, Typography } from '@mui/material'
import axios from 'axios'
// const items =[
//     {
//         'id':'1',
//         'title':'Apple',
//         'price':'23',
//         'description':'Sold by pound (lb)'
//     }
// ]

const ProductListing = ()=>{
    const location = useLocation();
    const[items, setItem] = React.useState([])

    React.useEffect(()=>{
  
      getProduct()
       
       
      }, []);


      const getProduct = async() =>{
          let stall = location.state.name
        const res = await axios.post('http://localhost:3001/api/customer/product-stall',{stall:stall})
        setItem(res.data)
      }

    return(
        <div>
            <Box margin={5}>
                <Typography color="success.main" variant="h3"> Stall Product - {location.state.name}</Typography>
           
            
            <ProductList items={items}/>
            </Box>
        </div>
    );

} 

export default ProductListing