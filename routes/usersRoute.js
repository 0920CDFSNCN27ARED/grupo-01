const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images/users" });
const { check, validationResult, body } = require("express-validator");
const getDbFile = require("../utils/getDbFile");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isGuest = require("../middlewares/isGuest");

const usersController = require("../controllers/usersController");

const { BuyerUser } = require("../database/models");
const { CellarUser } = require("../database/models");

router.get("/registro", isGuest, usersController.showRegister);
router.post(
    "/registro",
    upload.single("image"),
    [
        check("firstName").notEmpty().withMessage("Debes colocar tu nombre."),
        check("lastName").notEmpty().withMessage("Debes colocar tu apellido."),
        check("dni").isLength(8).withMessage("Debes colocar tu número de DNI."),
        check("email").isEmail().withMessage("Debes ingresar un mail valido."),
        // body("email")
        //     .custom((value) => {
        //         const buyerUsers = BuyerUser.findOne({
        //             where: {
        //                 email: value,
        //             },
        //         });
        //         const cellarUser = CellarUser.findOne({
        //             where: {
        //                 email: value,
        //             },
        //         });
        //         if (buyerUsers || cellarUser) {
        //             return false;
        //         }
        //         return true;
        //     })
        //     .withMessage("Email ya exitente"),
        check("password")
            .isLength(8)
            .withMessage(
                "Debes ingresar una contraseña de al menos 8 caracteres."
            ),
        // check("image")
        //     .notEmpty()
        //     .withMessage("Debes elegir una imagen de perfil."),
        check("terms")
            .notEmpty()
            .withMessage("Debes leer y aceptar los terminos y condiciones."),
    ],

    usersController.newUser
);

router.get("/registroBodega", isGuest, usersController.showRegisterWineCellar);
router.post(
    "/registroBodega",
    upload.single("image"),
    [
        check("cellarName")
            .notEmpty()
            .withMessage("Debes colocar el nombre de la bodega."),
        check("companyName")
            .notEmpty()
            .withMessage("Debes colocar la razon social de tu empresa."),
        check("cuit")
            .isLength(11)
            .withMessage("Debes colocar el número de CUIT de la empresa."),
        check("country")
            .notEmpty()
            .withMessage(
                "Debes colocar el pais en el que se establece tu empresa."
            ),
        check("province")
            .notEmpty()
            .withMessage(
                "Debes colocar la provincia en la que se establece tu empresa."
            ),
        check("email").isEmail().withMessage("Debes ingresar un mail valido."),
        body("email")
            .custom((value) => {
                const users = getDbFile("users.json");
                const emailExtists = users.find((user) => {
                    return user.email == value;
                });
                if (emailExtists) {
                    return false;
                }
                return true;
            })
            .withMessage("Email ya exitente"),
        check("password")
            .isLength(8)
            .withMessage(
                "Debes ingresar una contraseña de al menos 8 caracteres."
            ),
        check("image")
            .notEmpty()
            .withMessage("Debes elegir una imagen de perfil."),
        check("terms")
            .notEmpty()
            .withMessage("Debes leer y aceptar los terminos y condiciones."),
    ],
    usersController.newUserWineCellar
);
router.get("/perfil", isLoggedIn, usersController.showProfile);
router.post("/perfil", usersController.logOut);

router.get("/login", isGuest, usersController.showLogin);
router.post(
    "/login",
    [
        check("password")
            .notEmpty()
            .withMessage("Debes colocar una contraseña."),
        check("email").notEmpty().withMessage("Ingrese un mail valido."),
    ],
    usersController.logIn
);
module.exports = router;
