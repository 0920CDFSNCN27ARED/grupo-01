const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images/users" });

const usersController = require("../controllers/usersController");

router.get("/registro", usersController.showRegister);
router.post("/registro", upload.single("image"), usersController.newUser);

router.get("/registroBodega", usersController.showRegisterWineCellar);
router.post(
    "/registroBodega",
    upload.single("image"),
    usersController.newUserWineCellar
);
router.get("/login", usersController.showLogin);

module.exports = router;
