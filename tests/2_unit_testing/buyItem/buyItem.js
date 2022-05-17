const { getProductById } = require("./product");// import product file to get product info

 //UC-7: BuyItem
 function buyItem(productId, stallId, amount){

    //This Function will get us all the details of the product including availability
     const product = getProductById(productId);

    //Return fail if no product is found
     if(!product) { return false }

    //Checks if the product can be found in that stall
    const isItemAvailable = product.availableAt.includes(stallId);

    //return fail if not in the stall desired
    if(!isItemAvailable) { return false}

    //Finally return success 
    return true;

}

module.exports = buyItem