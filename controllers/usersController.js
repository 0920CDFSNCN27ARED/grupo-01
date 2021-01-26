const getUsers = require("../utils/getDbFile");
const fileToGet = "users.json";

const bcrypt = require("bcrypt");
const expressValidator = require("express-validator");

const usersControllers = {
    showLogin: (req, res) => {
        res.render("users/login");
    },
    showRegister: (req, res) => {
        res.render("users/signup");
    },
    newUser: (req, res) => {
        const createUser = require("../utils/createNew");
        createUser(getUsers, fileToGet, req);
        res.redirect("/productos");
    },
    newUserWineCellar: (req, res) => {
        const createUser = require("../utils/createNew");
        createUser(getUsers, fileToGet, req);
        res.redirect("/productos");
    },

    showRegisterWineCellar: (req, res) => {
        res.render("users/signupWineCellar");
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
            req.session.loggedUserId = loggedUser.id;
            res.redirect("/");
        }
    },
};

module.exports = usersControllers;
