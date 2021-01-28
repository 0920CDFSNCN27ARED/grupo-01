const getUsers = require("../utils/getDbFile");

function authenticateSession(req, res, next) {
    res.app.locals.user = req.session.loggedUser;
    const savedUser = res.app.locals.user;
 
    if (!savedUser) {
        return next();
    }

    const users = getUsers("users.json");

    const loggedUser = users.find((user) => {
        return user.id == savedUser.id;
    });

    if (!loggedUser) {
        delete req.session.loggedUser;
        return next();
    }

    res.app.locals.user = loggedUser;

    next();
}

module.exports = authenticateSession;
