const { Order, Product } = require("../../database/models");

module.exports = {
    createOrder: async (req, res) => {
        const cart = req.body;
        const userId = res.locals.user.id;
        ///// Get totalPrice
        let totalPrice = 0;
        for (const cartProd of cart) {
            const fullProd = await Product.findByPk(cartProd.id);
            totalPrice += Number(fullProd.price * cartProd.quantity);
        }
        ////Check if order exists
        const existingOrder = await Order.findOne({
            where: {
                buyerUserId: userId,
            },
        });
    
        if (existingOrder) {
            await Order.update(
                {
                    addressId: 1,
                    total: totalPrice,
                },
                {
                    where: {
                        buyerUserId: userId,
                    },
                }
            );
            return res.send(existingOrder);
        }

        await Order.create({
            buyerUserId: userId,
            addressId: 1,
            total: totalPrice,
        });
        res.send({ msg: "Orden creada" });
    },
};
