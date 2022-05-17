function viewMarketMap(name){

    const market =  ['San Ignacio','Belmopan','Belize', 'Orange Walk']// list of market
   
    if(market.includes(name)){//verify market name pass in is valid using market lists
        
        return true
    }

    return false
}

module.exports = viewMarketMap