"use strict";
module.exports = (sequelize, DataTypes) => {
    const BuyerUser = sequelize.define(
        "BuyerUser",
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            dni: DataTypes.INTEGER(8),
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            image: DataTypes.STRING,
        },
        {}
    );
    BuyerUser.associate = function (models) {
        BuyerUser.hasMany(models.Adress, {
            as: "adresses",
        });
    };
    return BuyerUser;
};
