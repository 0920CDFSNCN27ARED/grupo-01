//const mercadopago = require("mercadopago");
const { Order, Product, OrderItem, Status } = require("../database/models");

module.exports = {
    success: async (req, res) => {
        const paidStatus = await Status.findOne({
            where: {
                name: "paid",
            },
        });
        const newOrder = await Order.update(
            {
                statusId: paidStatus.id,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.redirect("/");
    },
    pending: (req, res) => {
        res.redirect("/usuarios/perfil");
    },
    failure: (req, res) => {
        res.redirect("/carrito");
    },
};
