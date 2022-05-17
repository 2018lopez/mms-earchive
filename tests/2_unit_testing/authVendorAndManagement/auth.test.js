const auth = require('./auth')
// Pass Test for UC-1: AuthVendorandManagement
test('Auth Vendor and Management Users - UC-1: AuthVendorandManagement - Unit',() =>{
    
    
    expect(auth('ilopez','%34k','vendor')).toBe(true)
})

// Fail Test for UC-1: AuthVendorandManagement
test('Auth Vendor and Management Users - UC-1: AuthVendorandManagement - Unit',() =>{
    
    
    expect(auth('ilopez','%34k','management')).toBe(true)
})