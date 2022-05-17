
import './App.css';
import Main from './components/customer/Main'
import ExploreMarket from './components/customer/ExploreMarket'
import About from './components/customer/About'
import BeVendor from './components/customer/BeVendor'
import Contact from './components/customer/Contact'
import Login from './components/customer/Login'
import Admin from './components/management/views/admin'
import Vendor from './components/vendor/VendorPage'
import SignUp from './components/customer/SignUp'
import ProductListing from './components/customer/ProductListing'
import ProductDetails from './components/customer/comp/ProductDetails'
import {Routes, Route} from 'react-router-dom'
import axios from 'axios'
import React,{  Component } from 'react';

axios.defaults.headers.common['Authorization']=localStorage.getItem('auth-token', 'username')


export default class App extends Component {
  
  

  render(){
      return (
        <div className="App">
    
          <Routes>
        
          <Route exact path='/' element={<Main/>}/>
            <Route exact path='/Home' element={<Main/>}/>
            <Route path='Explore-Market' element={<ExploreMarket/>}/>
            <Route path="AboutUS" element={<About />}/>
            <Route path="Be-Vendor" element={<BeVendor />}/>
            <Route path="Contact" element={<Contact />}/>
            <Route path="Login" element={<Login />}/>
            <Route path="SignUp" element={<SignUp />}/>
            <Route path="Products" element={<ProductListing />}/>
            <Route path='/product/:id' element={<ProductDetails/>} />
            <Route path="vendor/*" element={<Vendor />}/>
      
            
            <Route exact path='Admin/*' element={<Admin/>}/>
            

          </Routes>
      
        

        

        </div>
      );
  }
}

