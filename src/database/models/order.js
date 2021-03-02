"use strict";
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "Order",
        {
            total: DataTypes.FLOAT(10, 2),
            buyerUserId: DataTypes.INTEGER,
            addressId: DataTypes.INTEGER,
        },
        {
            tablename: "orders",
            timestamps: false,
        }
    );
    Order.associate = function (models) {
        Order.hasOne(models.Address, {
            as: "orderAddress",
            foreingKey: "adressId",
        });
        Order.belongsTo(models.BuyerUser, {
            as: "buyerUser",
            foreingKey: "buyerUserId",
        });
        Order.hasMany(models.OrderItem, {
            as: "orderitems",
            foreingKey: "orderId",
        });
        Order.belongsToMany(models.Product, {
<<<<<<< HEAD:src/database/models/order.js
            as: "orderCart",
            through: "orders_products",
=======
            as: "products",
>>>>>>> 73959fddc14df1602e2eb9c1ce4674ea6de470db:database/models/order.js
            foreingKey: "orderId",
            through: "OrderItem",
        });
    };
    return Order;
};
