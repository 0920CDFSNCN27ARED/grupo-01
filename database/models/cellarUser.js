"use strict";

module.exports = (sequelize, DataTypes) => {
    const CellarUser = sequelize.define(
        "CellarUser",
        {
            cellarName: DataTypes.STRING,
            companyName: DataTypes.STRING,
            cuit: DataTypes.INTEGER(11),
            country: DataTypes.STRING,
            province: DataTypes.STRING,
            password: DataTypes.STRING(10),
        },
        {
            tableName: "cellar_users",
            timestamps: false,
        }
    );
    CellarUser.associate = function (models) {
        CellarUser.hasMany(models.Product, {
            as: "products",
        });
    };
    return CellarUser;
};
