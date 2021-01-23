const getUsers = require("../utils/getDbFile");
const fileToGet = "users.json";
const saveUsers = require("../utils/saveDbChanges");
const bcrypt = require("bcrypt");

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

    showRegisterWineCellar: (req, res) => {
        res.render("users/signupWineCellar");
    },

    newWineCellarUser: (req, res) => {
        const createUser = require("../utils/createNew");
        createUser(getUsers, fileToGet, req);
        res.redirect("/productos");
    },
};

module.exports = usersControllers;
