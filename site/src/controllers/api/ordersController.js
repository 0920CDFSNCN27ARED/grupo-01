const { Order, Product } = require("../../database/models");

module.exports = {
    createOrder: async (req, res) => {
        const cart = req.body;
        let totalPrice = 0;
        for (const cartProd of cart) {
            const fullProd = await Product.findByPk(cartProd.id);
            cart.fullProd = fullProd;
            totalPrice += Number(fullProd.price * cartProd.quantity);
        }
        console.log(req.body.userId);
        Order.create({
            buyerUserId: req.body.userId,
            addressId: 1,
            total: totalPrice,
        });
        res.send({ msg: "hola" });
    },
};
