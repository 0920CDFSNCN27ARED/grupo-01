"use strict";
module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define(
        "Cart",
        {
            total_price: DataTypes.INTEGER,
        },
        {}
    );
    Cart.associate = function (models) {
        Cart.hasOne(models.Adress, {
            as: "cartAdress",
            foreingKey: "idAdress",
        });
        // Cart.hasOne(models.PaymentMethod, {
        //     as: "paymentMethod",
        //     foreingKey: "idpaymentMethod",
        // });
    };
    return Cart;
};
