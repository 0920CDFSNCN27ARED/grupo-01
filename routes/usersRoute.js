const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images/users" });

const usersController = require("../controllers/usersController");

const { check, validationResult, body } = require("express-validator");

router.get("/registro", usersController.showRegister);
router.post(
    "/registro",
    upload.single("image"),
    [
        check("firstName").isLength({ min: 3 }),
        check("lastName").isLength({ min: 3 }),
        check("dni").isInt().isLength({ min: 6, max: 8 }),
        check("email").isEmail(),
        // check("password").isStrongPassword(
        //     {
        //         minLength: 5,
        //         minLowercase: 1,
        //         minUppercase: 1,
        //         minNumbers: 1,
        //     }
        //     //SOLUCIONAR IS STRONG no valida. Terms idem
        //     ),
            check("terms").equals("on")
    ],
    usersController.newUser
);

router.get("/registroBodega", usersController.showRegisterWineCellar);
router.post(
    "/registroBodega",
    upload.single("image"),
    usersController.newUserWineCellar
);

router.get("/login", usersController.showLogin);
router.post("/login", usersController.logIn);

module.exports = router;
