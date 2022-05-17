const auth = require('../authVendorAndManagement/auth')
const gInvoice = require('./gInvoices')


// Past Test UC-18: GenerateInvoices


test('GenerateInvoices - UC-18: GenerateInvoices - Unit',() =>{
    
    
    expect(gInvoice('v90','F3',auth('rRamos','%34k','management'))).toBe(true)
})


// Fail Test UC-18: GenerateInvoices


test('GenerateInvoices - UC-18: GenerateInvoices Unit',() =>{
    
    
    expect(gInvoice('v90','F0',auth('rRamos','%34k','management'))).toBe(true)
})