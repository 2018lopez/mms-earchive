  //UC-5: TourStall - function verify that stall exist for the tour stall
  function tourStall(name){

    const stall =  ['C10','P15','VF30', 'F3']// stall list avaliable

    if(stall.includes(name)){
        
        return true
    }
    return false
}

module.exports = tourStall