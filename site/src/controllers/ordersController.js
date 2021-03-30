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
        res.render("success");
    },
    pending: (req, res) => {
        res.render("pending");
    },
    failure: (req, res) => {
        res.render("failure");
    },
};
