function isLoggedIn(req, res, next) {
    if (!req.session.loggedUser) {
        res.redirect("/");
    } else {
        next();
    }
}

module.exports = isLoggedIn;
