"use strict";

module.exports = (sequelize, DataTypes) => {
    const CellarUser = sequelize.define("CellarUser", {
        cellar_name: DataTypes.STRING,
        company_name: DataTypes.STRING,
        cuit: DataTypes.INTEGER(11),
        country: DataTypes.STRING,
        province: DataTypes.STRING,
        password: DataTypes.STRING(10),
    });
    CellarUser.associate = function (models) {
        CellarUser.hasMany(models.Product, {
            as: "products",
        });
    };
    return CellarUser;
};
