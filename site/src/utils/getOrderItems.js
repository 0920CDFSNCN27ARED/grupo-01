async function getOrderItems(user, OrderItem) {
    let orderItems;
        const ordersIds = [];
        for (const order of user.orders) {
            ordersIds.push(order.id);
        }
        orderItems = await OrderItem.findAll({
            where: {
                orderId: ordersIds,
            },
        });
        return orderItems;
}

module.exports = getOrderItems;