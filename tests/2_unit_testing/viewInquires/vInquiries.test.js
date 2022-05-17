const auth = require('../authVendorAndManagement/auth')
const vInquiry = require ('./vInquiries')
//Pass Test UC-19: ViewInquires

test('ViewInquires - UC-19: ViewInquires',() =>{
    
    
    expect(vInquiry(auth('rRamos','%34k','management'))).toBe(true)
})

//Fail Test UC-19: ViewInquires

test('ViewInquires - UC-19: ViewInquires',() =>{
    
    
    expect(vInquiry(auth('rRamos','%4k','management'))).toBe(true)
})