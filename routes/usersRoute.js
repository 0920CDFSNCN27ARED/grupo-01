const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images/users" });
const { check, validationResult, body } = require("express-validator");
const getDbFile = require("../utils/getDbFile");

// const userValidations = [
//     check("firstName").notEmpty().withMessage("Debes colocar tu nombre."),
//     check("lastName").notEmpty().withMessage("Debes colocar tu apellido."),
//     check("dni").isLength(8).withMessage("Debes colocar tu número de DNI."),
//     check("email").notEmpty().withMessage("Debes ingresar un email."),
//     check("email").isEmail().withMessage("Debes ingresar un mail valido."),
//     body("email")
//         .custom(function (value) {
//             const users = getDbFile("users.json");
//             for (i = 0; i < users.lenght; i++) {
//                 if (users[i].email == value) {
//                     return false;
//                 } else {
//                     return true;
//                 }
//             }
//         })
//         .withMessage("Email ya existente."),
//     check("password")
//         .isLength(8)
//         .withMessage("Debes ingresar una contraseña de al menos 8 caracteres."),
//     check("image").notEmpty().withMessage("Debes elegir una imagen de perfil."),
//     check("terms")
//         .notEmpty()
//         .withMessage("Debes leer y aceptar los terminos y condiciones."),
// ];

const usersController = require("../controllers/usersController");

router.get("/registro", usersController.showRegister);
router.post("/registro", upload.single("image"), usersController.newUser);

router.get("/registroBodega", usersController.showRegisterWineCellar);
router.post(
    "/registroBodega",
    upload.single("image"),
    usersController.newUserWineCellar
);
router.get("/perfil", usersController.showProfile);
router.post("/perfil", usersController.logOut);

router.get("/login", usersController.showLogin);
router.post(
    "/login",
    [
        check("password")
            .notEmpty()
            .withMessage("Debes colocar una contraseña."),
        check("email").isEmail().withMessage("Ingrese un mail valido."),
    ],
    usersController.logIn
);
module.exports = router;
