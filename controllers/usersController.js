const getUsers = require("../utils/getDbFile");
const fileToGet = "users.json";
const createUser = require("../utils/createNew");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
const { equal } = require("assert");

const usersControllers = {
    showRegister: (req, res) => {
        res.render("users/signup");
    },
    newUser: (req, res) => {
        const errors = validationResult(req);
        createUser(getUsers, fileToGet, req);
        res.redirect("/productos");
    },
    newUserWineCellar: (req, res) => {
        createUser(getUsers, fileToGet, req);
        res.redirect("/productos");
    },

    showRegisterWineCellar: (req, res) => {
        res.render("users/signupWineCellar");
    },

    newWineCellarUser: (req, res) => {
        createUser(getUsers, fileToGet, req);
        res.redirect("/productos");
    },
    showLogin: (req, res) => {
        res.render("users/login");
    },
    logIn: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const users = getUsers("users.json");

            for (let i = 0; i < users.length; i++) {
                if (
                    users[i].email == req.body.email &&
                    bcrypt.compareSync(req.body.password, users[i].password)
                ) {
                    const user = users[i];

                    req.session.loggedUser = user;

                    break;
                }
            }
            let msg = "Credenciales invalidas.";
            if (req.session.loggedUser == undefined) {
                res.render("users/login", {
                    errorMsg: msg,
                });
            } else {
                if (req.body.remember != undefined) {
                    res.cookie("remember", req.session.loggedUser.id, {
                        maxAge: 60 * 1000 * 60 * 24,
                    });
                }
                req.app.locals.user = req.session.loggedUser;
           
                res.redirect("/usuarios/perfil");
            }
        } else {
            res.render("users/login", { errors: errors.errors });
        }
    },
    logOut: (req, res) => {
        res.clearCookie("remember");
       req.app.locals.user = null;
        req.session.destroy((err) => {
            res.redirect("/");
        });
    },
    showProfile: (req, res) => {
       
        if (req.cookies.remember != undefined || req.session.loggedUser != undefined) {
            res.render("users/profile");
        } else {
            res.redirect("/");
        }
    },
};

module.exports = usersControllers;