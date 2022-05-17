 //Function to generate Invoice - Verify that vendor and stall exist. Authenicate user management account
 function generateInvoice(vendorId, stallId, authUser){

    const stall =  ['C10','P15','VF30', 'F3']// list of stall  
    const vendor = ['v56', 'v34', 'v90', 'v32']// list of vendor accounts

    if(vendor.includes(vendorId) && stall.includes(stallId) && authUser == true){
        
        return true
    }

    return false

}

 module.exports = generateInvoice