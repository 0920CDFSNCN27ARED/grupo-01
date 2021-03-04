function isGuest(req, res, next) {
    if (res.locals.user) {
        res.redirect("/");
    } else {
        next();
    }
}

module.exports = isGuest;
