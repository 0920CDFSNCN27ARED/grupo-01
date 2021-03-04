"use strict";

module.exports = (sequelize, DataTypes) => {
    const CellarUser = sequelize.define(
        "CellarUser",
        {
            cellarName: DataTypes.STRING,
            companyName: DataTypes.STRING,
            cuit: DataTypes.BIGINT(12),
            country: DataTypes.STRING,
            province: DataTypes.STRING,
            password: DataTypes.STRING(200),
            email: DataTypes.STRING,
            image: DataTypes.STRING,
        },
        {
            tableName: "cellar_users",
        }
    );
    CellarUser.associate = function (models) {
        CellarUser.hasMany(models.Product, {
            as: "products",
            foreignKey: "cellarUserId",
        });
    };
    return CellarUser;
};
