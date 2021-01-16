const fs = require("fs");
const path = require("path");
const getProducts = require("../utils/getDbFile");
const fileToGet = "products.json"



const cartController = {
    showCart: (req, res) => {
        const products = getProducts(fileToGet);
        res.render("products/productCart", { products: products });
    },

    showSaved: (req, res) => {
        res.render("products/savedProducts");
    },
};

module.exports = cartController;
