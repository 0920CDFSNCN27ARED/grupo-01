const { CellarUser, BuyerUser } = require("../database/models");

async function authenticateCookie(req, res, next) {   
    const isBuyer = req.cookies.rememberBuyer;
    const isCellar = req.cookies.rememberCellar;

    if (!isBuyer && !isCellar) {
        return next();
    }
    //User with orders ordered by status
    const loggedUser = await BuyerUser.findByPk(isBuyer);

    const loggedCellar = await CellarUser.findByPk(isCellar);

    if (loggedUser && isBuyer) {
        req.session.loggedUser = loggedUser;
        res.locals.user = req.session.loggedUser;

        return next();
    }
    if (loggedCellar && isCellar) {
        req.session.loggedUser = loggedCellar;
        res.locals.user = req.session.loggedUser;
        return next();
    }
    delete req.session.loggedUser;
    return next();
}
module.exports = authenticateCookie;

