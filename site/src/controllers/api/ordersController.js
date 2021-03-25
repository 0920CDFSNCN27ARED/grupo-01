const { Order, Product, OrderItem } = require("../../database/models");

module.exports = {
    createOrder: async (req, res) => {
        const cart = req.body;
        const userId = res.locals.user.id;
        let lastOrderId = await Order.findAll({
            order: [["id", "DESC"]],
        });
        ////Check if order exists
        const existingOrder = await Order.findOne({
            where: {
                buyerUserId: userId,
            },
        });
        // Get new orderId
        const newOrderId = lastOrderId[0] ? lastOrderId[0].id + 1 : 1;
        const orderId = existingOrder ? existingOrder.id : newOrderId;

        ///// Get totalPrice
        let totalPrice = 0;
        for (const cartProd of cart) {
            const fullProd = await Product.findByPk(cartProd.id);
            totalPrice += Number(fullProd.price * cartProd.quantity);
        }

        // Create/Update order
        if (existingOrder) {
            totalPrice += existingOrder.total;
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
        } else {
            await Order.create({
                buyerUserId: userId,
                addressId: 1,
                total: totalPrice,
            });
        }
        //Create orderItems
        for (const cartProd of cart) {
            const fullProd = await Product.findByPk(cartProd.id);
            const orderItemExists = await OrderItem.findOne({
                where: {
                    productId: cartProd.id,
                    orderId: orderId,
                },
            });
            if (orderItemExists) {
                const newSubTotal =
                    orderItemExists.subtotal +
                    fullProd.price * cartProd.quantity;
                await OrderItem.uCDpdate(
                    {
                        subtotal: newSubTotal,
                        quantity:
                            orderItemExists.quantity +
                            Number(cartProd.quantity),
                    },
                    {
                        where: {
                            productId: cartProd.id,
                            orderId: orderId,
                        },
                    }
                );
            } else {
                await OrderItem.create({
                    subtotal: fullProd.price * cartProd.quantity,
                    quantity: cartProd.quantity,
                    price: fullProd.price,
                    orderId: orderId,
                    productId: cartProd.id,
                    discount: fullProd.discount,
                });
            }
        }

        res.send(cart);
    },
};
