module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define(
        "OrderItem",
        {
            orderId: DataTypes.INTEGER(11),
            productId: DataTypes.INTEGER(11),
            quantity: DataTypes.INTEGER,
            subtotal: DataTypes.FLOAT(10, 2),
            price: DataTypes.FLOAT(10, 2),
            discount: DataTypes.FLOAT(10, 2),
        },
        {
            tableName: "order_items",
            timestamps: false,
        }
    );
    OrderItem.associate = function (models) {
        OrderItem.belongsTo(models.Product, {
            as: "products",
            foreignKey: "productId",
            onDelete: "cascade",
        });
        OrderItem.belongsTo(models.Order, {
            as: "orders",
            foreignKey: "orderId",
            onUpdate: "cascade"
        });
    };
    return OrderItem;
};
