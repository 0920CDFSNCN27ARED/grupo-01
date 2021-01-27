const getUsers = require("../utils/getDbFile");

function authenticate(req, res, next) {
    const id = req.session.loggedUser;

    if (!id) {
        res.redirect("/usuarios/login");
    } else {
        const users = getUsers("user.json");
        const loggedUserId = users.find((user) => {
            return user.id == id;
        });
        if (!loggedUserId) {
            res.redirect("/usuarios/login");
        } else {
            res.locals = { loggedUserId: loggedUserId };
            next();
        }
    }
}

module.exports = authenticate;
