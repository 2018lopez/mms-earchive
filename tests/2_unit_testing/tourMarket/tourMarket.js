 // UC-4: TourMarket
 function tourMarket(name){

    //Avaliable Markets
    const market =  ['San Ignacio','Belmopan','Belize', 'Orange Walk']

    if(market.includes(name)){//validate market name with avaliable market list
        
        return true
    }
    
    return false

}

module.exports = tourMarket