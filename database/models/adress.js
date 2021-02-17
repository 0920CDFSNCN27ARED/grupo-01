"use strict";
module.exports = (sequelize, DataTypes) => {
    const Adress = sequelize.define("Adress", {
        street_name: DataTypes.STRING,
        street_number: DataTypes.STRING,
        apartment: DataTypes.STRING,
        city: DataTypes.STRING,
        zip_code: DataTypes.INTEGER,
    });
    Adress.associate = function (models) {
        Adress.belongsTo(models.BuyerUser, {
            as: "buyerUser",
            foreingKey: "idbuyerUser",
        });
    };
    return Adress;
};
