function assertSignIn(req, res, next) {
    if (!req.session.loggedUser) {
        res.redirect("/usuarios/login");
    } else {
        res.locals.loggedUser = req.session.loggedUser;
        next();
    }
}

module.exports = assertSignIn;
