const { CellarUser, BuyerUser, OrderItem } = require("../database/models");
const getOrderItems = require("../utils/getOrderItems");

async function authenticateSession(req, res, next) {
    const savedUser = req.session.loggedUser;

    if (!savedUser) {
        return next();
    }

    const loggedUser = await BuyerUser.findByPk(savedUser.id, {
        include: ["addresses", "orders"],
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
