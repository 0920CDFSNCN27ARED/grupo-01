const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");

router.get("/registro", usersController.showRegister);
router.get("/registroBodega", usersController.showRegisterWineCellar);
router.get("/login", usersController.showLogin);

module.exports = router;
