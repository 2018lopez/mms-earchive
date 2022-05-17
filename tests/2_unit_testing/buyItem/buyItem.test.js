const buyitem = require('./buyItem')


// Pass Test for UC-7: BuyItem
test('Buy Item - UC-7: BuyItem - Unit ', () =>{
    
    expect(buyitem(1002, 1001, 2)).toBe(true)
})

// Fail Test for UC-7: BuyItem
test('Buy Item - UC-7: BuyItem - Unit ', () =>{
    
    expect(buyitem(1002, 1009, 2)).toBe(true)
})