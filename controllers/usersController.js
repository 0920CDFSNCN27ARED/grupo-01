const saveUsers = require("../utils/saveDbChanges");

const usersControllers = {
    showLogin: (req, res) => {
        res.render("users/login");
    },
    showRegister: (req, res) => {
        res.render("users/signup");
    },

    showRegisterWineCellar: (req, res) => {
        res.render("users/signupWineCellar");
    },
};

module.exports = usersControllers;
