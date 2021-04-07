const { CellarUser, BuyerUser, OrderItem,Order } = require("../database/models");
const getOrderItems = require("../utils/getOrderItems");
const {Op} = require("sequelize")

async function authenticateSession(req, res, next) {
    const savedUser = req.session.loggedUser;

    if (!savedUser) {
        return next();
    }

    //User with orders ordered by status
    const loggedUser = await BuyerUser.findByPk(savedUser.id, {
        include: [
            "addresses",
            {
                model: Order,
                as: "orders",
                where: { statusId: { [Op.lt]: 3 } },
            },
        ],
        order: [[["orders", "statusId", "ASC"]]],
    });
    if (loggedUser) {
        orderItems = await getOrderItems(loggedUser, OrderItem);
    }

    const loggedCellar = await CellarUser.findByPk(savedUser.id);

    if (loggedUser && savedUser.dni) {
        res.locals.user = loggedUser;
        res.locals.orderItems = orderItems;
        return next();
    }
    if (loggedCellar && savedUser.cuit) {
        res.locals.user = loggedCellar;
        return next();
    }
    delete req.session.loggedUser;
    return next();
}

module.exports = authenticateSession;
