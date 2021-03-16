"use strict";
module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("Address", {
        streetName: DataTypes.STRING,
        streetNumber: DataTypes.STRING,
        apartment: DataTypes.STRING,
        city: DataTypes.STRING,
        zipCode: DataTypes.INTEGER,
        buyerUserId: DataTypes.INTEGER,
    });
    Address.associate = function (models) {
        Address.belongsTo(models.BuyerUser, {
            as: "addressUser",
            foreignKey: "buyerUserId",
        });
        Address.hasMany(models.Order, {
            as: "orderAddress",
        });
    };
    return Address;
};
