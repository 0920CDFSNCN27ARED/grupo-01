function isLoggedIn(req, res, next) {
    if (!res.locals.user) {
        return res.redirect("/");
    } else {
        return next();
    }
}

module.exports = isLoggedIn;
