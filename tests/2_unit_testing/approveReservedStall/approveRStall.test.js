const auth = require('../authVendorAndManagement/auth')
const approveRStall =require('./approveRStall')


// Pass Test for UC-15: ApproveReservedStall

test('ApproveReservedStall - UC-15: ApproveReservedStall',() =>{
    
    
    expect(approveRStall('v32','P15',auth('rRamos','%34k','management'))).toBe(true)
})

// Fail Test for UC-15: ApproveReservedStall

test('ApproveReservedStall - UC-15: ApproveReservedStall',() =>{
    
    
    expect(approveRStall('v32','P5',auth('rRamos','%34k','management'))).toBe(true)
})