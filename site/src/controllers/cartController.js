const { Console } = require("console");
const { Order, Product, OrderItem } = require("../database/models");

const cartController = {
    // showCart: async (req, res) => {
    //     try {
    //         const cartProdutcts = await OrderItem.findAll({
    //             where: { "$orders.buyerUserId$": req.session.loggedUser.id },
    //             include: ["orders"],
    //         });
    //         res.render("products/productCart", { products: cartProdutcts });
    //     } catch (err) {
    //         res.send(err);
    //     }
    // },
    showCart: async (req, res) => {
        const products = await Product.findAll();
        res.render("products/productCart", { products });
    },

    showSaved: (req, res) => {
        res.render("products/savedProducts");
    },
    // addToOrder: async (req, res) => {
    //     const productAdded = await Product.findByPk(req.params.id);
    //     let order = await Order.findOne({
    //         where: {
    //             buyerUserId: req.session.loggedUser.id,
    //         },
    //     });

    //     if (!order) {
    //         order = Order.create({
    //             total: 0,
    //             buyerUserId: req.session.loggedUser.id,
    //             addressId: 1,
    //             createdAt: Date.now(),
    //         });
    //     }

    //     const subtotal = productAdded.dataValues.price * req.body.quantity;

    //     const item = await OrderItem.create({
    //         productId: req.params.id,
    //         quantity: req.body.quantity,
    //         price: productAdded.dataValues.price,
    //         subtotal: subtotal,
    //         discount: productAdded.dataValues.discount,
    //         OrderId: order.id,
    //     });
    //     res.redirect("/carrito");
    // },

    addToOrder: (req, res) => {
        res.redirect("/carrito");
    },
};

module.exports = cartController;

//// Si existe la orden -- preguntar si ya existe el orderProducts -- Sino existe, crearlo -- si existe cambiarle el quantity -- Hace update de Order

////// Si no existe la orden -- crearla  y crear order products
