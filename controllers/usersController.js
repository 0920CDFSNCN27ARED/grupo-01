const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");

const { BuyerUser } = require("../database/models");
const { CellarUser } = require("../database/models");

////////FUNCTIONS
async function findUser(model) {
    return await model.findOne({
        where: {
            email: req.body.email,
        },
    });
}

function checkHash(user) {
    if (bcrypt.compareSync(req.body.password, user.password)) return true;
}
function validateAndStoreInSession(user) {
    if (user && checkHash(user)) {
        req.session.loggedUser = user;
    }
}
///////////////////////////

const usersControllers = {
    showRegister: (req, res) => {
        res.render("users/signup");
    },
    newUser: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                const newBuyerUser = await BuyerUser.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    dni: req.body.dni,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    image: req.file.filename,
                });
                console.log(
                    newBuyerUser,
                    "CONSOLE LOG ------------------------"
                );
                req.session.loggedUser = newBuyerUser;
                res.locals.user = newBuyerUser;

                res.redirect("/productos");
            } else {
                res.render("users/signUp", { errors: errors.errors });
            }
        } catch (err) {
            res.send(err);
        }
    },
    newUserWineCellar: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                const newCellarUser = await CellarUser.create({
                    cellarName: req.body.cellarName,
                    companyName: req.body.companyName,
                    cuit: req.body.cuit,
                    country: req.body.country,
                    province: req.body.province,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    image: req.file.filename,
                });
                req.session.loggedUser = newCellarUser;

                res.redirect("/productos");
            } else {
                res.render("users/signupWineCellar", { errors: errors.errors });
            }
        } catch (err) {
            res.send(err);
        }
    },

    showRegisterWineCellar: (req, res) => {
        res.render("users/signupWineCellar");
    },
    showLogin: (req, res) => {
        res.render("users/login");
    },
    logIn: async (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            let msg = "Credenciales invalidas.";
            const buyerUser = findUser(BuyerUser);
            const cellarUser = findUser(CellarUser);

            validateAndStoreInSession(buyerUser); // req.session.loggedUser
            if (!buyerUser) checkAndStoreInSession(cellarUser); // req.session.loggedUser

            ///////////////////////////////////////
            if (!req.session.loggedUser) {
                res.render("users/login", {
                    errorMsg: msg,
                });
            } else if (req.body.remember) {
                res.cookie("remember", req.session.loggedUser.id, {
                    maxAge: 60 * 1000 * 60 * 24,
                });
                if (req.session.loggedUser.dni) {
                    res.cookie("isUser", true, {
                        maxAge: 60 * 1000 * 60 * 24,
                    });
                }
            }
            res.locals.user = req.session.loggedUser;
            res.render("users/profile");
        } else {
            res.render("users/login", { errors: errors.errors });
        }
    },
    logOut: (req, res) => {
        res.clearCookie("remember");
        res.clearCookie("isUser");
        res.locals.user = null;
        req.session.destroy((err) => {
            res.redirect("/");
        });
    },
    showProfile: (req, res) => {
        res.render("users/profile");
    },
};

module.exports = usersControllers;
