"use strict";

module.exports = (sequelize, DataTypes) => {
    const CellarUser = sequelize.define(
        "CellarUser",
        {
            cellarName: DataTypes.STRING,
            companyName: DataTypes.STRING,
            cuit: DataTypes.INTEGER(45),
            country: DataTypes.STRING,
            province: DataTypes.STRING,
            password: DataTypes.STRING(200),
            email: DataTypes.STRING,
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
