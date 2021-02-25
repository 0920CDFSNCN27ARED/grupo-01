"use strict";
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "Order",
        {
            totalPrice: DataTypes.INTEGER,
            buyerUserId: DataTypes.INTEGER,
            adressId: DataTypes.INTEGER,
        },
        {
            tablename: "orders",
            timestamps: false,
        }
    );
    Order.associate = function (models) {
        Order.hasOne(models.Adress, {
            as: "cartAdress",
            foreingKey: "adressId",
        });
        Order.belongsTo(models.BuyerUser, {
            as: "buyerUser",
            foreingKey: "buyerUserId",
        });
        Order.belongsToMany(models.Product, {
            as: "cartProducts",
            through: "orders_products",
            foreingKey: "orderId",
            otherKey: "productId",
        });
        // Order.hasOne(models.PaymentMethod, {
        //     as: "paymentMethod",
        //     foreingKey: "idpaymentMethod",
        // });
    };
    return Order;
};
