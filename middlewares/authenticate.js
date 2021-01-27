const getUsers = require("../utils/getDbFile");

function authenticate(req, res, next) {
    const loggedUser = req.session.loggedUser;
    const cookieUser = req.cookies.remember;

    if (loggedUser == undefined && cookieUser != undefined) {
        const users = getUsers("users.json");
        const sessionUser = users.find((user) => {
            return user.id == cookieUser;
        });
        req.session.loggedUser == sessionUser;
        res.locals.user = sessionUser;
    }

    next();
}

module.exports = authenticate;
