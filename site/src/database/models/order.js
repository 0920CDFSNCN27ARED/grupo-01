"use strict";
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "Order",
        {
            total: DataTypes.FLOAT(10, 2),
            buyerUserId: DataTypes.INTEGER,
            addressId: DataTypes.INTEGER,
            statusId: DataTypes.INTEGER,
        },
        {
            tablename: "orders",
            timestamps: true,
        }
    );
    Order.associate = function (models) {
        Order.belongsTo(models.Address, {
            as: "address",
            foreignKey: "addressId",
            onDelete: "cascade",
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
        Order.belongsTo(models.Status, {
            as: "status",
        });
    };
    return Order;
};
