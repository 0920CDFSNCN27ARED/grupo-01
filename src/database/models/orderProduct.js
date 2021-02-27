"use strict";
module.exports = (sequelize, DataTypes) => {
    const OrderProduct = sequelize.define(
        "orders_products",
        {
            orderId: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            partialPrice: DataTypes.DECIMAL,
            productId: DataTypes.INTEGER,
        },

        {
            tablename: "orders_products",
            timestamps: false,
        }
    );
    return OrderProduct;
};

