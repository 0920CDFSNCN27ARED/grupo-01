function isLoggedIn(req, res, next) {
    if (!res.app.locals.user) {
        next();
    } else {
        res.redirect("/");
    }
}

module.exports = isLoggedIn;
