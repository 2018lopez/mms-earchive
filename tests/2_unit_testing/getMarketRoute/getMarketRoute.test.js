const getRoute = require('./getMarketRoute')

// Pass Test for UC-3: GetMarketRoute
test('Get Route - UC-3: GetMarketRoute - Unit', () =>{

    expect(getRoute('17.1573248','-89.0830848','17.1569824,','-89.0730774')).toBe(true)

})


// Fail Test for UC-3: GetMarketRoute
test('Get Route - UC-3: GetMarketRoute - Unit', () =>{

    expect(getRoute('17.1573248','-89.0830848','17.1569824,','-89.0730778')).toBe(true)

})