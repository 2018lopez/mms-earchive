import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from './ProductDetail'


const items =
    {
        'id':'1',
        'title':'Apple',
        'price':'23',
        'description':'Sold by pound (lb)',
        'stock': 10
    }


const ItemDetailContainer = () => {
  
  return(
      <div>
           <ProductDetail {...items} />
      </div>

  );

}

export default ItemDetailContainer;