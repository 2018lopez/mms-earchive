//Function for approveReserveStall - verify that the stall is avaliable, vendor has exist and also authenicate management user
function approveReserveStall(vendorId, stallId, authUser){

    const stall =  ['C10','P15','VF30', 'F3']// list of stall 
    const vendor = ['v56', 'v34', 'v90', 'v32']// list of vendor account by their id

    if(vendor.includes(vendorId) && stall.includes(stallId) && authUser == true){

        return true
    }

        return false
}

module.exports = approveReserveStall