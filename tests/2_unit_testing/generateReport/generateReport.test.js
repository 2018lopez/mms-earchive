const auth = require('../authVendorAndManagement/auth')
const gReport = require('./generateReport')


// Pass Test for UC-11: GenerateReport

test('GenerateReport - UC-11: GenerateReport - unit',() =>{
    
    
    expect(gReport('Yearly Expenses',auth('ilopez','%34k','vendor'))).toBe(true)
})


// Fail Test for UC-11: GenerateReport

test('GenerateReport - UC-11: GenerateReport - unit',() =>{
    
    
    expect(gReport('Expenses',auth('ilopez','%34k','vendor'))).toBe(true)
})