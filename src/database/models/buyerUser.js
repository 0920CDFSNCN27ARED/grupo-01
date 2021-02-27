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
            timestamps: false,
        }
    );
    BuyerUser.associate = function (models) {
        BuyerUser.hasMany(models.Adress, {
            as: "adresses",
        });
    };
    return BuyerUser;
};
