const getUsers = require("../utils/getDbFile");
const fileToGet = "users.json";
const createUser = require("../utils/createNew");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
const { equal } = require("assert");
const { BuyerUser } = require("../database/models");
const { CellarUser } = require("../database/models");
const { Console } = require("console");

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
            const buyerUser = await BuyerUser.findOne({
                where: {
                    email: req.body.email,
                },
            });
            const cellarUser = await CellarUser.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (
                buyerUser &&
                bcrypt.compareSync(req.body.password, buyerUser.password)
            ) {
                req.session.loggedUser = buyerUser;
            } else if (
                !buyerUser &&
                cellarUser &&
                bcrypt.compareSync(req.body.password, cellarUser.password)
            ) {
                req.session.loggedUser = cellarUser;
            }
            ///////////////////////////////////////
            let msg = "Credenciales invalidas.";
            if (req.session.loggedUser == undefined) {
                res.render("users/login", {
                    errorMsg: msg,
                });
            } else if (req.body.remember != undefined) {
                if (req.session.loggedUser.dni) {
                    res.cookie("remember", req.session.loggedUser.id, {
                        maxAge: 60 * 1000 * 60 * 24,
                    });
                    res.cookie("isUser", true);
                } else if (req.session.loggedUser.cuit) {
                    res.cookie("remember", req.session.loggedUser.id, {
                        maxAge: 60 * 1000 * 60 * 24,
                    });
                }
                res.cookie("remember", req.session.loggedUser.id, {
                    maxAge: 60 * 1000 * 60 * 24,
                });
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
