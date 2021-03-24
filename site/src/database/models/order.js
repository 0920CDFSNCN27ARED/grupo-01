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
        Order.belongsTo(models.Address, {
            as: "address",
            foreignKey: "addressId",
            onDelete: "cascade"
        });
        Order.belongsTo(models.BuyerUser, {
            as: "buyerUser",
            foreignKey: "buyerUserId",
        });
        Order.hasMany(models.OrderItem, {
            as: "orderitems",
            foreignKey: "orderId",
        });
        Order.belongsToMany(models.Product, {
            as: "products",
            foreignKey: "orderId",
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
