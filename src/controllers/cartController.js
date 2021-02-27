const { Console } = require("console");
const { Order, Product, OrderProduct } = require("../database/models");

const cartController = {
    showCart: async (req, res) => {
        try {
            const products = await Product.findAll();
            res.render("products/productCart", {products: products});
        } catch (err) {
            res.send(err)
        }
    },

    showSaved: (req, res) => {
        res.render("products/savedProducts");
    },
    addToCart: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            const existingOrder = await Order.findOne({
                where: { buyerUserId: res.locals.user.id },
            });
        
            await OrderProduct.create({
                quantity: 2,
                productId: product.id,
                orderId: existingOrder.id,
                partialPrice: 100,
            })
            Product.findall({
                include: ["cartProducts"],
            });
         
            res.redirect("/carrito");
        } catch (err) {
            res.send(err);
        }
    },
};

module.exports = cartController;

//// Si existe la orden -- preguntar si ya existe el orderProducts -- Sino existe, crearlo -- si existe cambiarle el quantity -- Hace update de Order

////// Si no existe la orden -- crearla  y crear order products
