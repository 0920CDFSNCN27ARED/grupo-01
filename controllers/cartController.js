const getProducts = require("../utils/getDbFile");
const fileToGet = "products.json";
const { Order } = require("../database/models");

const cartController = {
    showCart: (req, res) => {
        const products = Product.findAll();
        res.render("products/productCart", { products: products });
    },

    showSaved: (req, res) => {
        res.render("products/savedProducts");
    },
    addToCart: async (req, res) => {
        console.log("ARRANCO")
        try {
            await Order.create({
                totalPrice: 5,
                buyerUserId: res.locals.user.id,
            })
            console.log("HECHO")
        } catch (err) {
            res.send(err);
        }
    },
};

module.exports = cartController;
