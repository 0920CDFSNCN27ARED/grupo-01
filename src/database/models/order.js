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
            as: "products",
            foreingKey: "orderId",
            otherKey: "productId",
            through: "OrderItem",
        });
        // Order.hasOne(models.PaymentMethod, {
        //     as: "paymentMethod",
        //     foreingKey: "idpaymentMethod",
        // });
    };
    return Order;
};
