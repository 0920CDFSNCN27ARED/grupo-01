const { timeStamp } = require("console");
const { Order, Product, OrderItem, Address } = require("../database/models");

const cartController = {
    showCart: (req, res) => {
        res.render("products/productCart");
    },

    showSaved: (req, res) => {
        res.render("products/savedProducts");
    },
    addToOrder: async (req, res) => {
        const productAdded = await Product.findByPk(req.body.id);
        const order = Order.create({
            total: 0,
            buyerUserId: req.session.loggedUser.id,
            addressId: 1,
            createdAt: Date.now(),
        });
        const item = await OrderItem.create({
            productId: productAdded.id,
            quantity: req.body.quantity,
            price: productAdded.price,
            subtotal: productAdded.price * req.body.quantity * 0.9,
            discount: productAdded.discount,
            orderId: order.id,
        });
        console.log(item);
    },
};

module.exports = cartController;
