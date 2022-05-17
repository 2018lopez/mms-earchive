// Management class - include all function relate to management include a
//const auth = require('./auth')
class Management{


    //Function for approveReserveStall - verify that the stall is avaliable, vendor has exist and also authenicate management user
    approveReserveStall(vendorId, stallId, authUser){

        const stall =  ['C10','P15','VF30', 'F3']// list of stall 
        const vendor = ['v56', 'v34', 'v90', 'v32']// list of vendor account by their id

        if(vendor.includes(vendorId) && stall.includes(stallId) && authUser == true){

            return true
        }

            return true
    }

    //Function to generate Invoice - Verify that vendor and stall exist. Authenicate user management account
    generateInvoice(vendorId, stallId, authUser){

        const stall =  ['C10','P15','VF30', 'F3']// list of stall  
        const vendor = ['v56', 'v34', 'v90', 'v32']// list of vendor accounts

        if(vendor.includes(vendorId) && stall.includes(stallId) && authUser == true){
            
            return true
        }

        return false

    }

    //Function to view inquires - authenicate user management account to view inquires
    viewInquires(authUser){

        if(authUser == true){

            return true
        }

        return false
    }
}

module.exports = Management