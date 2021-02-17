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
        },
        {
            timestamps: false,
        }
    );
    Product.associate = function (models) {
        Product.belongsTo(models.CellarUser, {
            as: "cellaruser",
            foreignKey: "cellarUserId",
        });
    };
    return Product;
};
