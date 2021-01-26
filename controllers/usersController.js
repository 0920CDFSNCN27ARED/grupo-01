const getUsers = require("../utils/getDbFile");
const fileToGet = "users.json";
const createUser = require("../utils/createNew");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");

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
            for (let i = 0; i < users.lenght; i++) {
                if (
                    users[i].email == req.body.email &&
                    bcrypt.compareSync(req.body.password, users[i].password)
                ) {
                    const user = users[i];
                    req.session.loggedUser = user;
                    break;
                }
            }
            if (req.session == undefined) {
                res.render("users/login", {
                    errors: [{ msg: "Credenciales invalidas." }],
                });
            }
            res.redirect("/productos");
        } else {
            res.render("users/login", { errors: errors.errors });
        }
    },
};

module.exports = usersControllers;
