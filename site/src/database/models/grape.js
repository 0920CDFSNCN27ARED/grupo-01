
module.exports = (sequelize, DataTypes) => {
    const Grape = sequelize.define(
        "Grape",
        { name: DataTypes.STRING },
        {
            tablename: "grapes",
            timestamps: false,
        }
    );

    Grape.associate = function (models) {
        Grape.hasMany(models.Product, {
            as: "products",
        });
    };

    return Grape;
};
