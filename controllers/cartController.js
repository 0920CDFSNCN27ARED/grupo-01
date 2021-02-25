const getProducts = require("../utils/getDbFile");
const fileToGet = "products.json";
const { Product } = require("../database/models");

const cartController = {
    showCart: (req, res) => {
        const products = Product.findAll();
        res.render("products/productCart", { products: products });
    },

    showSaved: (req, res) => {
        res.render("products/savedProducts");
    },
    addToCart: (req, res) => {
        console.log("HOLA");
        res.end("hola");
    },
};

module.exports = cartController;
