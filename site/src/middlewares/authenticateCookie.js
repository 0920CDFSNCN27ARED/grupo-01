const { CellarUser, BuyerUser,OrderItem } = require("../database/models");
const getOrderItems = require("../utils/getOrderItems");

async function authenticateCookie(req, res, next) {
    const cookiedUser = req.cookies.remember;
    const isUser = req.cookies.isUser;

    if (!cookiedUser) {
        return next();
    }

    const loggedUser = await BuyerUser.findByPk(cookiedUser, {
        include: ["addresses", "orders"],
    });
    if (loggedUser) {
        orderItems = await getOrderItems(loggedUser, OrderItem);
    }
    const loggedCellar = await CellarUser.findByPk(cookiedUser);

    if (loggedUser && isUser) {
        req.session.loggedUser = loggedUser;
        res.locals.user = req.session.loggedUser;
        res.locals.orderItems = orderItems;
        return next();
    }
    if (loggedCellar) {
        req.session.loggedUser = loggedCellar;
        res.locals.user = req.session.loggedUser;
        return next();
    }
    delete req.session.loggedUser;
    return next();
}

module.exports = authenticateCookie;
