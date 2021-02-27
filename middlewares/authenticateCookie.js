// const getUsers = require("../utils/getDbFile");
const { CellarUser, BuyerUser } = require("../database/models");

async function authenticateCookie(req, res, next) {
    const cookiedUser = req.cookies.remember;
    const isUser = req.cookies.isUser;

    if (!cookiedUser) {
        return next();
    }

    const loggedUser = await BuyerUser.findByPk(cookiedUser);
    const loggedCellar = await CellarUser.findByPk(cookiedUser);

    if (loggedUser && isUser) {
        req.session.loggedUser = loggedUser;
        res.locals.user = req.session.loggedUser;
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
