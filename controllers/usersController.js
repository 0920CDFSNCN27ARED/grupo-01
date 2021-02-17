const getUsers = require("../utils/getDbFile");
const fileToGet = "users.json";
const createUser = require("../utils/createNew");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
const { equal } = require("assert");
const { BuyerUser } = require("../database/models");

const usersControllers = {
    showRegister: (req, res) => {
        res.render("users/signup");
    },
    newUser: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            BuyerUser.create({
                firsName: req.body.firsName,
                lasTName: req.body.lasTName,
                dni: req.body.dni,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                image: req.file.filename,
            });
            res.redirect("/productos");
        } else {
            res.render("users/signUp", { errors: errors.errors });
        }
    },
    newUserWineCellar: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            CellarUser.create({
                cellarName: req.body.cellarName,
                companyName: req.body.companyName,
                cuit: req.body.cuit,
                country: req.body.country,
                province: req.body.province,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                image: req.file.filename,
            });
            res.redirect("/productos");
        } else {
            res.render("users/signupWineCellar", { errors: errors.errors });
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
                    password: bcrypt.compareSync(req.body.password),
                },
            });
            if (buyerUser) {
                req.session.loggedUser = buyerUser;
            }
            const cellarUser = CellarUser.findOne({
                where: {
                    email: req.body.email,
                    password: bcrypt.compareSync(req.body.password),
                },
            });

            if (cellarUser) {
                req.session.loggedUser = cellarUser;
            }
            let msg = "Credenciales invalidas.";
            if (req.session.loggedUser == undefined) {
                res.render("users/login", {
                    errorMsg: msg,
                });
            } else if (req.body.remember != undefined) {
                res.cookie("remember", req.session.loggedUser.id, {
                    maxAge: 60 * 1000 * 60 * 24,
                });
            }
            res.locals.user = req.session.loggedUser;

            res.redirect("/usuarios/perfil");
        } else {
            res.render("users/login", { errors: errors.errors });
        }
    },
    logOut: (req, res) => {
        res.clearCookie("remember");
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
