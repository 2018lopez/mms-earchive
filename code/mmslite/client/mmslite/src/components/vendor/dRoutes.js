import {Route, Routes} from 'react-router-dom'

import Report from './views/Report';
import Dashboard from './views/Dashboard';
import Orders from './views/Orders';
import Stall from './views/Stall';
import Products from './views/Products';
import React from 'react';
import UpdateOrder from './views/EditOrder';
import Inquiry from './views/Inquiry';
import Billing from './views/Billing';
import Setting from './views/Settings'

export const dRoutes = (
  <React.Fragment>
    <Routes>
        <Route path='Home' element={<Dashboard/>}/>
        <Route path='Orders' element={<Orders/>}/>
        <Route path='Report' element={<Report/>}/>  
        <Route path='Stall' element={<Stall/>}/>
        <Route path='Products' element={<Products/>}/>
        <Route path='Inquiry' element={<Inquiry/>}/>
        <Route path='Billing' element={<Billing/>}/>
        <Route path='Settings' element={<Setting/>}/>
      
        <Route path="/editOrder/:id" element={<UpdateOrder />} />
    </Routes>
  </React.Fragment>
);