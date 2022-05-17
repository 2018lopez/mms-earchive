const tStall = require('./tourStall')

// Pass Test for  UC-5: TourStall
test('Tour Stall - UC-5: TourStall - Unit',() =>{

    expect(tStall('C10')).toBe(true)
})

// Fail Test for  UC-5: TourStall
test('Tour Stall - UC-5: TourStall - Unit',() =>{

    expect(tStall('C89')).toBe(true)
})