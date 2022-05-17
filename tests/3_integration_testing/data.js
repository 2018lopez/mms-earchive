//Object of Products
const data = {
    products: [
       {
           id: 1001, //Unique id for item/product
           name: "Banana",
           category: "Fruit",
           availableAt: [] //Represent the stall available at
       },
       {
           id: 1002,
           name: "Apples",
           category: "Fruit",
           availableAt: [ 1001, 1003, 1006] //Represent the stall
       },
       {
           id: 1003,
           name: "Potato",
           category: "Vegetable",
           availableAt: [ 1001, 1003, 1006] //Represent the stall
       },
       {
           id: 1004,
           name: "Onion",
           category: "Vegetable",
           availableAt: [ 1001, 1003, 1006] //Represent the stall
       },
       {
           id: 1005,
           name: "Rice and Beans",
           category: "Food",
           availableAt: [ 1001, 1003, 1006] //Represent the stall
       },
       {
           id: 1006,
           name: "Boil Corn",
           category: "Food",
           availableAt: [ 1001, 1003, 1006] //Represent the stall
       },
   ]
};

module.exports = data;