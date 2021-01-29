function isGuest(req, res, next) {
    if (req.session.loggedUser) {
        res.redirect("/");
    } else {
        next();
    }
}

module.exports = isGuest;
