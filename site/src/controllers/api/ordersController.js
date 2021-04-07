const mercadopago = require("mercadopago");
const { Order, Product, OrderItem, Status } = require("../../database/models");

module.exports = {
    createOrder: async (req, res) => {
        const cart = req.body;
        const userId = res.locals.user.id;
        let newOrderId;

        ///// Get totalPrice
        let totalPrice = 0;
        for (const cartProd of cart) {
            const fullProd = await Product.findByPk(cartProd.id);
            totalPrice += Number(fullProd.price * cartProd.quantity);
        }
        // Get unpaid status row
        const rejectedStatus = await Status.findOne({
            where: {
                name: "rejected",
            },
        });
        const unpaidStatus = await Status.findOne({
            where: {
                name: "unpaid",
            },
        });
        // Check for pending order
        const rejectedOrder = await Order.findOne({
            where: {
                statusId: rejectedStatus.id,
                buyerUserId: userId,
            },
        });

        if (rejectedOrder) {
            await rejectedOrder.update({
                updatedAt: Date.now(),
                total: totalPrice,
            });
            newOrderId = rejectedOrder.id;
            for (const cartProd of cart) {
                cartProd.fullProd = await Product.findByPk(cartProd.id);
                await OrderItem.update(
                    {
                        orderId: newOrderId,
                        subtotal: cartProd.fullProd.price * cartProd.quantity,
                        quantity: cartProd.quantity,
                        price: cartProd.fullProd.price,
                        productId: cartProd.id,
                        discount: cartProd.fullProd.discount,
                        createdAt: Date.now(),
                    },
                    {
                        where: {
                            orderId: rejectedOrder.id,
                            productId: cartProd.id,
                        },
                    }
                );
            }
        } else {
            // Create order
            const newOrder = await Order.create(
                {
                    buyerUserId: userId,
                    addressId: 1,
                    total: totalPrice,
                    statusId: unpaidStatus.id,
                    createdAt: Date.now(),
                },
                {
                    returning: true,
                }
            );
            newOrderId = newOrder.id;
            //Create orderItems
            for (const cartProd of cart) {
                cartProd.fullProd = await Product.findByPk(cartProd.id);
                await OrderItem.create({
                    subtotal: cartProd.fullProd.price * cartProd.quantity,
                    quantity: cartProd.quantity,
                    price: cartProd.fullProd.price,
                    orderId: newOrderId,
                    productId: cartProd.id,
                    discount: cartProd.fullProd.discount,
                    createdAt: Date.now(),
                });
            }
        }

        //MERCADO PAGO
        const preference = {
            items: cart.map((cartProd) => {
                return {
                    title: cartProd.fullProd.productName,
                    unit_price: Number(cartProd.fullProd.price),
                    quantity: Number(cartProd.quantity),
                };
            }),
            back_urls: {
                success: `${process.env.HOST}/orden/mercadopago/exito/${newOrderId}`,
                pending: `${process.env.HOST}/orden/mercadopago/pendiente/${newOrderId}`,
                failure: `${process.env.HOST}/mercadopago/rechazada/${newOrderId}`,
            },
            payment_methods: {
                excluded_payment_methods: [
                    {
                        id: "ticket",
                    },
                    {
                        id: "atm",
                    },
                ],
            },
        };

        const result = await mercadopago.preferences.create(preference);
        res.send({ init_url: result.body.init_point });
    },
};
