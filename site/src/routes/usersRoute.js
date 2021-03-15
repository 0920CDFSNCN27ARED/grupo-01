const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images/users" });
const { check, validationResult, body } = require("express-validator");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isGuest = require("../middlewares/isGuest");

const usersController = require("../controllers/usersController");

const { BuyerUser } = require("../database/models");
const { CellarUser } = require("../database/models");

router.post("/cambioContra/:id", isLoggedIn, usersController.changePassword);

router.get("/registro", isGuest, usersController.showRegister);
router.post(
    "/registro",
    upload.single("image"),
    [
        check("firstName").notEmpty().withMessage("Debes colocar tu nombre."),
        check("lastName").notEmpty().withMessage("Debes colocar tu apellido."),
        check("dni")
            .isLength(8)
            .withMessage("Debes colocar tu número de DNI.")
            .custom(async (value) => {
                const dni = await BuyerUser.findOne({
                    where: {
                        dni: value,
                    },
                });
                if (dni) {
                    return false;
                }
                return true;
            })
            .withMessage("El DNI ya está registrado."),
        check("email")
            .isEmail()
            .withMessage("Debes ingresar un mail valido.")
            .custom(async (value) => {
                const buyerUser = await BuyerUser.findOne({
                    where: {
                        email: value,
                    },
                });
                if (buyerUser) {
                    return false;
                }
                const cellarUser = await CellarUser.findOne({
                    where: {
                        email: value,
                    },
                });
                if (cellarUser) {
                    return false;
                }
                return true;
            })
            .withMessage("El email ingresado ya fue registrado."),
        check("password")
            .isLength(8)
            .withMessage(
                "Debes ingresar una contraseña de al menos 8 caracteres."
            ),
        check("image")
            .custom((value) => {
                if (!value) {
                    return false;
                }
                return true;
            })
            .withMessage("Debes elegir una imagen de perfil."),
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
            .withMessage("Debes colocar el número de CUIT de la empresa.")
            .custom(async (value) => {
                const cuit = await CellarUser.findOne({
                    where: {
                        cuit: value,
                    },
                });
                if (cuit) {
                    return false;
                }
                return true;
            })
            .withMessage("El CUIT ingresado ya está registrado."),
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
        check("email")
            .isEmail()
            .withMessage("Debes ingresar un mail valido.")
            .custom(async (value) => {
                const buyerUser = await BuyerUser.findOne({
                    where: {
                        email: value,
                    },
                });
                if (buyerUser) {
                    return false;
                }
                const cellarUser = await CellarUser.findOne({
                    where: {
                        email: value,
                    },
                });
                if (cellarUser) {
                    return false;
                }
                return true;
            })
            .withMessage("El email ingresado ya fue registrado."),
        check("password")
            .isLength(8)
            .withMessage(
                "Debes ingresar una contraseña de al menos 8 caracteres."
            ),
        check("image")
            .custom((value) => {
                if (!value) {
                    return false;
                }
                return true;
            })
            .withMessage("Debes elegir una imagen de perfil."),
        check("terms")
            .notEmpty()
            .withMessage("Debes leer y aceptar los terminos y condiciones."),
    ],
    usersController.newUserWineCellar
);
router.get("/perfil/:id", isLoggedIn, usersController.showProfile);
router.post("/perfil", usersController.logOut);

router.get("/login", isGuest, usersController.showLogin);
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

router.post("/editarDireccion", isLoggedIn, usersController.editAddress);

module.exports = router;
