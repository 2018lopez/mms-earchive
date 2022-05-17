import * as React from 'react';
import Header from '../Layouts/Header'
import Footer from '../Layouts/Footer'
import StallTable from './comp/Stall/stallTable'

const BeVendor = ()=>{

    return(
        <div>
            <Header/>
            <h1>Vendor - Explore Stalls</h1>
            <StallTable/>
            <Footer/>
        </div>
    );

};

export default BeVendor;