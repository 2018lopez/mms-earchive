// function to get product by id
const data = require('./data');

exports.getProductById = (id) => {
    return data.products.find(product => product.id === id );
}
