const fs = require("fs");
const path = require("path");
const getProducts = require("../utils/getProducts");



const cartController = {
    showCart: (req, res) => {
        const products = getProducts();
        res.render("products/productCart", { products: products });
    },

    showSaved: (req, res) => {
        res.render("products/savedProducts");
    },
};

module.exports = cartController;
