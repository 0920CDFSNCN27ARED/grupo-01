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
        try {
            await Order.create({
                totalPrice: 5,
                buyerUserId: res.locals.user.id,
                
            })
        } catch (err) {
            res.send(err);
        }
    },
};

module.exports = cartController;
