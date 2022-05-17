import {Route, Routes} from 'react-router-dom'
import * as React from 'react';
import Inquiry from './Inquiry';
import Vendor from './vendor'
import Home from './home'
import Stall from './stalls'
import Invoice from './invoice'

export const routes = (
  <React.Fragment>
    <Routes>

        <Route path='Home' element={<Home/>}/>  
        <Route path='Stall' element={<Stall/>}/>
        <Route path='Invoices' element={<Invoice/>}/>
        <Route path='Inquiry' element={<Inquiry/>}/>
      
    </Routes>
  </React.Fragment>
);