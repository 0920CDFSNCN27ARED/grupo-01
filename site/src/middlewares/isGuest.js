function isGuest(req, res, next) {
    if (res.locals.user) {
       return res.redirect("/");
    } else {
        next();
    }
}

module.exports = isGuest;
