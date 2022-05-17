const viewMMap = require('./viewMarketMap')
// Pass Test for UC-2: ViewMarketMap
test('Select Market to view grid Map - UC-2: ViewMarketMap - Unit', () =>{

    expect(viewMMap('Belmopan')).toBe(true)
})
// Fail Test for UC-2: ViewMarketMap
test('Select Market to view grid Map - UC-2: ViewMarketMap - Unit', () =>{

    expect(viewMMap('Corozal')).toBe(true)
})