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
<<<<<<< HEAD:src/database/models/product.js
            timestamps: false,
=======
>>>>>>> 73959fddc14df1602e2eb9c1ce4674ea6de470db:database/models/product.js
        }
    );
    Product.associate = function (models) {
        Product.belongsTo(models.CellarUser, {
            as: "cellaruser",
        });
<<<<<<< HEAD:src/database/models/product.js
        Product.belongsToMany(models.Order, {
            as: "cartProducts",
            through: "orders_products",
            foreingKey: "productId",
            otherKey: "orderId",
=======
        Product.hasMany(models.OrderItem, {
            as: "orderitem",
            foreignKey: "productId",
        });
        Product.belongsToMany(models.Order, {
            as: "orders",
            foreignKey: "productId",
            through: "OrderItem",
>>>>>>> 73959fddc14df1602e2eb9c1ce4674ea6de470db:database/models/product.js
        });
    };
    return Product;
};
