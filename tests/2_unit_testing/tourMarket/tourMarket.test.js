const tMarket = require('./tourMarket')

// Pass Test for UC-4: TourMarket
test('Tour Market - UC-4: TourMarket - Unit',() =>{

    expect(tMarket('San Ignacio')).toBe(true)
})

// Fail Test for UC-4: TourMarket
test('Tour Market - UC-4: TourMarket - Unit',() =>{

    expect(tMarket('Stann Creek')).toBe(true)
})