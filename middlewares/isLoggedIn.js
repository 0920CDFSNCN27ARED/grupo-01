function isLoggedIn(req, res, next) {
    if (res.app.locals.user) {
        res.redirect("/");
    } else {
        next();
    }
}

module.exports = isLoggedIn;
