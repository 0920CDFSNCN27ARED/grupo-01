const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images/users" });
const bcrypt = require("bcrypt");

const usersController = require("../controllers/usersController");

router.get("/registro", usersController.showRegister);
router.post("/registro",usersController.newUser)

router.get("/registroBodega", usersController.showRegisterWineCellar);
router.get("/login", usersController.showLogin);

module.exports = router;
