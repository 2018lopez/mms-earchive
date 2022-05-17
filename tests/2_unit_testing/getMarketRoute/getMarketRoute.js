function getMarketRoute(clat,clong,dlat,dlong){

    if(clat == '17.1573248' && clong == '-89.0830848' && dlat == '17.1569824,' && dlong == '-89.0730774'){//validate current location and destination location coordinates

        return true
    }

    return false
}

module.exports = getMarketRoute