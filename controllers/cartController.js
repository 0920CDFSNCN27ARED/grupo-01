const getProducts = require("../utils/getDbFile");
const fileToGet = "products.json";
const { Order, Product } = require("../database/models");

const cartController = {
    showCart: async (req, res) => {
        const products = await Product.findAll();
        res.render("products/productCart", { products: products });
    },

    showSaved: (req, res) => {
        res.render("products/savedProducts");
    },
    addToCart: async (req, res) => {
        try {
            const existingOrder = await Order.findOne({
                where: { buyerUserId: res.locals.user.id },
            });
            if (existingOrder) {
                await Order.update(
                    {
                        totalPrice: 6,
                    },
                    {
                        where: { buyerUserId: res.locals.user.id },
                    }
                );
            } else {
                await Order.create({
                    totalPrice: 5,
                    buyerUserId: res.locals.user.id,
                });
            }
            res.redirect("/carrito");
        } catch (err) {
            res.send(err);
        }
    },
};

module.exports = cartController;
