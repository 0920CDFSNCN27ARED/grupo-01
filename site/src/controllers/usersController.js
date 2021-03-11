const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");

const { BuyerUser } = require("../database/models");
const { CellarUser } = require("../database/models");

////////FUNCTIONS

function logOut(req, res, redirectPath) {
    res.clearCookie("remember");
    res.clearCookie("isUser");
    res.locals.user = null;
    req.session.destroy((err) => {
        res.redirect(redirectPath);
    });
}

async function findUser(model, req) {
    return await model.findOne({
        where: {
            email: req.body.email,
        },
    });
}

function checkHash(user, req) {
    if (bcrypt.compareSync(req.body.password, user.password)) return true;
}
function validateAndStoreInSession(user, req) {
    if (user && checkHash(user, req)) {
        req.session.loggedUser = user;
    }
    return;
}

async function updatePassword(user, req, checkHash) {
    if (checkHash(user, req)) {
        await user.update(
            {
                password: bcrypt.hashSync(req.body.newPassword, 10),
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
    } 
}

///////////////////////////

const usersControllers = {
    showRegister: (req, res) => {
        res.render("users/signup");
    },
    newUser: async (req, res) => {
        const errors = validationResult(req);
        try {
            
            if (errors.isEmpty()) {
                const newBuyerUser = await BuyerUser.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    dni: req.body.dni,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    image: req.file.filename,
                });
                req.session.loggedUser = newBuyerUser;
                res.locals.user = newBuyerUser;

                res.redirect("/productos");
            } else {
                console.log(errors);
                res.render("users/signUp");
            }
        } catch (err) {
            res.send(err);
        }
    },
    newUserWineCellar: async (req, res) => {
        const errors = validationResult(req);
        try {
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
                res.render("users/signupWineCellar");
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
            const buyerUser = await findUser(BuyerUser, req);
            const cellarUser = await findUser(CellarUser, req);

            validateAndStoreInSession(buyerUser || cellarUser, req); // req.session.loggedUser

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
        logOut(req, res, "/");
    },
    showProfile: (req, res) => {
        res.render("users/profile");
    },

    changePassword: async (req, res) => {
        if (res.locals.user.cuit) {
            const cellarUser = await CellarUser.findByPk(req.params.id);
            await updatePassword(cellarUser, req, checkHash);
            logOut(req, res, "/usuarios/login");
            
        }
        const buyerUser = await BuyerUser.findByPk(req.params.id);

        await updatePassword(buyerUser, req, checkHash);
        logOut(req, res, "/usuarios/login");
    },
};

module.exports = usersControllers;
