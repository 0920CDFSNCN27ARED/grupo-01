"use strict";
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "Order",
        {
            total_price: DataTypes.INTEGER,
        },
        {}
    );
    Order.associate = function (models) {
        Order.hasOne(models.Adress, {
            as: "cartAdress",
            foreingKey: "idAdress",
        });
        // Order.hasOne(models.PaymentMethod, {
        //     as: "paymentMethod",
        //     foreingKey: "idpaymentMethod",
        // });
    };
    return Order;
};
