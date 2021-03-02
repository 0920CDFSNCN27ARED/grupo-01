"use strict";
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "Product",
        {
            productName: DataTypes.STRING,
            grape: DataTypes.STRING,
            description: DataTypes.STRING,
            year: DataTypes.INTEGER,
            aged: DataTypes.INTEGER,
            temperature: DataTypes.INTEGER,
            price: DataTypes.INTEGER,
            stock: DataTypes.INTEGER,
            discount: DataTypes.INTEGER,
            image: DataTypes.STRING,
            cellarUserId: DataTypes.INTEGER,
        },
        {
            tablename: "products",
            timestamps: false
        }
    );
    Product.associate = function (models) {
        Product.belongsTo(models.CellarUser, {
            as: "cellaruser",
        });
        Product.hasMany(models.OrderItem, {
            as: "orderitem",
            foreignKey: "productId",
        });
        Product.belongsToMany(models.Order, {
            as: "orders",
            foreignKey: "productId",
            through: "OrderItem",
        });
    };
    return Product;
};
