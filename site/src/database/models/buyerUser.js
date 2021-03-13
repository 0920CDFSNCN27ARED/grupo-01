"use strict";
module.exports = (sequelize, DataTypes) => {
    const BuyerUser = sequelize.define(
        "BuyerUser",
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            dni: DataTypes.INTEGER(10),
            email: DataTypes.STRING,
            password: DataTypes.STRING(200),
            image: DataTypes.STRING,
        },
        {
            tableName: "buyer_users",
        }
    );
    BuyerUser.associate = function (models) {
        BuyerUser.hasMany(models.Address, {
            as: "addresses",
            foreignKey: "buyerUserId",
        });
        BuyerUser.hasMany(models.Order, {
            as: "orders",
        });
    };
    return BuyerUser;
};
