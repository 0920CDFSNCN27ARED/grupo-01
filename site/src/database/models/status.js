module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define(
        "Status",
        { name: DataTypes.STRING },
        {
            tableName: "status",
            timestamps: false,
        }
    );

    Status.associate = function (models) {
        Status.hasMany(models.Order, {
            as: "orders",
        });
    };

    return Status;
};
