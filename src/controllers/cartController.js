const { Console } = require("console");
const { Order, Product, OrderItem } = require("../database/models");

const cartController = {
    showCart: async (req, res) => {
        try {
            const products = await Product.findAll();
            res.render("products/productCart", { products: products });
        } catch (err) {
            res.send(err);
        }
    },

    showSaved: (req, res) => {
        res.render("products/savedProducts");
    },
    addToOrder: async (req, res) => {
        const productAdded = await Product.findByPk(req.body.id);
        let order = await Order.findOne({
            where: {
                buyerUserId: req.session.loggedUser.id,
            },
        });

        if (!order) {
            order = Order.create({
                total: 0,
                buyerUserId: req.session.loggedUser.id,
                addressId: 1,
                createdAt: Date.now(),
            });
        }

        const item = await OrderItem.create({
            orderId: order.dataValues.buyerUserId,
            productId: productAdded.dataValues.id,
            quantity: req.body.quantity,
            price: productAdded.dataValues.price,
            subtotal: productAdded.dataValues.price * req.body.quantity * 0.9,
            discount: productAdded.dataValues.discount,
        });
        console.log(item);
    },
};

module.exports = cartController;

//// Si existe la orden -- preguntar si ya existe el orderProducts -- Sino existe, crearlo -- si existe cambiarle el quantity -- Hace update de Order

////// Si no existe la orden -- crearla  y crear order products
