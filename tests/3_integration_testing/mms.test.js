//Import all Classes and Functions
const customer = require('./customer')
const management = require('./management')
const vendor = require('./vendor')
const auth = require('./auth')

//New Instance of the classes
const user = new customer()
const manageUser = new management()
const vendorUser = new vendor()


// Pass Test for UC-2: ViewMarketMap
test('Select Market to view grid Map - UC-2: ViewMarketMap', () =>{

    expect(user.viewMarketMap('Belmopan')).toBe(true)
})


// Pass Test for UC-3: GetMarketRoute
test('Get Route - UC-3: GetMarketRoute ', () =>{

    expect(user.getMarketRoute('17.1573248','-89.0830848','17.1569824,','-89.0730774')).toBe(true)

})

// Pass Test for UC-4: TourMarket
test('Tour Market - UC-4: TourMarket',() =>{

    expect(user.tourMarket('San Ignacio')).toBe(true)
})

// Pass Test for  UC-5: TourStall
test('Tour Stall - UC-5: TourStall',() =>{

    expect(user.tourStall('C10')).toBe(true)
})

// Pass Test for UC-7: BuyItem
test('Buy Item - UC-7: BuyItem ', () =>{
    
    expect(user.buyItem(1002, 1001, 2)).toBe(true)
})

// Pass Test for UC-1: AuthVendorandManagement
test('Auth Vendor and Management Users - UC-1: AuthVendorandManagement',() =>{
    
    
    expect(auth('ilopez','%34k','vendor')).toBe(true)
})


// Pass Test for UC-11: GenerateReport

test('GenerateReport - UC-11: GenerateReport',() =>{
    
    
    expect(vendorUser.generateReport('Yearly Expenses',auth('ilopez','%34k','vendor'))).toBe(true)
})


// Pass Test for UC-15: ApproveReservedStall

test('ApproveReservedStall - UC-15: ApproveReservedStall',() =>{
    
    
    expect(manageUser.approveReserveStall('v32','P15',auth('rRamos','%34k','management'))).toBe(true)
})



// Past Test UC-18: GenerateInvoices


test('GenerateInvoices - UC-18: GenerateInvoices',() =>{
    
    
    expect(manageUser.generateInvoice('v90','F3',auth('rRamos','%34k','management'))).toBe(true)
})


//Pass Test UC-19: ViewInquires

test('ViewInquires - UC-19: ViewInquires',() =>{
    
    
    expect(manageUser.viewInquires(auth('rRamos','%34k','management'))).toBe(true)
})