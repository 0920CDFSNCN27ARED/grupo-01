const { Order, Product, OrderItem } = require("../../database/models");

module.exports = {
    createOrder: async (req, res) => {
        const cart = req.body;
        const userId = res.locals.user.id;
        const lastOrderId = await Order.findAll({
            order: [["id", "DESC"]],
        });
        console.log(lastOrderId[0]);
        ////Check if order exists
        const existingOrder = await Order.findOne({
            where: {
                buyerUserId: userId,
            },
        });

        ///// Get totalPrice
        let totalPrice = 0;
        for (const cartProd of cart) {
            const fullProd = await Product.findByPk(cartProd.id);
            totalPrice += Number(fullProd.price * cartProd.quantity);
            await OrderItem.create({
                subtotal: fullProd.price * cartProd.quantity,
                quantity: cartProd.quantity,
                price: fullProd.price,
                orderId: existingOrder
                    ? existingOrder.id
                    : lastOrderId[0].id + 1,
                productId: cartProd.id,
                discount: 0,
            });
        }

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
