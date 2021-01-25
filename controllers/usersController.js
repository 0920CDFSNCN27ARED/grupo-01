const getUsers = require("../utils/getDbFile");
const fileToGet = "users.json";
const createUser = require("../utils/createNew");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");

const usersControllers = {
    showLogin: (req, res) => {
        res.render("users/login");
    },
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
    logIn: (req, res) => {
        const users = getUsers("users.json");
        const loggedUser = users.find((user) => {
            return (
                user.email == req.body.email &&
                bcrypt.compareSync(req.body.password, user.password)
            );
        });

        if (loggedUser == undefined) {
            res.redirect("/usuarios/login");
        } else {
            res.redirect("/productos");
            req.session.loggedUserId = loggedUser.id;
        }
    },
};

module.exports = usersControllers;
