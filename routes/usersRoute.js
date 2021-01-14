const express = require("express");
const router = require("./indexRoutes");
const router = express.Router;

const usersController = require("../controllers/usersController");

router.get("/registro", usersController.showRegister);
router.get("/login",usersController.showLogin);

module.exports = router;