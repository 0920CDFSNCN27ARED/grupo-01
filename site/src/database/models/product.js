"use strict";

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "Product",
        {
            productName: DataTypes.STRING,
            description: DataTypes.STRING,
            year: DataTypes.INTEGER,
            aged: DataTypes.INTEGER,
            temperature: DataTypes.INTEGER,
            price: DataTypes.INTEGER,
            stock: DataTypes.INTEGER,
            discount: DataTypes.INTEGER,
            image: {
                type: DataTypes.STRING,
                get() {
                    return this.getDataValue("image").split(",");
                },
            },
            cellarUserId: DataTypes.INTEGER,
            grapeId: DataTypes.INTEGER,
        },
        {
            tablename: "products",
        }
    );

    Product.associate = function (models) {
        Product.belongsTo(models.CellarUser, {
            as: "cellaruser",
        });
        Product.belongsTo(models.Grape, {
            as: "grape",
            foreignKey: "grapeId",
        });
        Product.hasMany(models.OrderItem, {
            as: "orderitem",
            foreignKey: "productId",
        });
        Product.belongsToMany(models.Order, {
            as: "orders",
            foreignKey: "productId",
            otherKey: "orderId",
            through: "OrderItem",
        });
    };
    return Product;
};
