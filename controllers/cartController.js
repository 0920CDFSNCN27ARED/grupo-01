const fs = require("fs");
const path = require("path");

// FUNCTION TO READ AND PARSE PRODUCTS
const getCartProducts = ()=>{
const productsJSON = fs.readFileSync(path.resolve(__dirname, "../data/cartProducts.json"), {encoding:"utf-8"}) 
return JSON.parse(productsJSON)
}



const cartController={
showCart: (req, res) => {
const products = getCartProducts()
res.render("productCart", {products:products});
},

showSaved:(req, res) => {
    res.render("savedProducts");
}

}

module.exports = cartController