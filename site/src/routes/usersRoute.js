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

/////////////////////
async function paramExists(searchParam, paramName, modelUser) {
    const whereObject = {};
    whereObject[paramName] = searchParam;
    const user = await modelUser.findOne({
        where: whereObject,
    });
    if (user) {
        throw new Error(`Ingresaste un ${paramName} ya registrado`);
    }
}
////////////////////////////////////////////
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
                await paramExists(value, "dni", BuyerUser);
            }),
        check("email")
            .isEmail()
            .withMessage("Debes ingresar un mail valido.")
            .custom(async (value) => {
                await paramExists(value, "email", CellarUser);
                await paramExists(value, "email", BuyerUser);
            }),
        check("password")
            .isLength(8)
            .withMessage(
                "Debes ingresar una contraseña de al menos 8 caracteres."
            ),
        check("image")
            .custom((value, { req }) => {
                if (!req.file) {
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
            .isLength(10)
            .withMessage("Debes colocar el número de CUIT de la empresa.")
            .custom(async (value) => {
                await paramExists(value, "cuit", CellarUser);
            }),
        check("countries").custom((value, { req }) => {
            if (!req.body.countries) {
                throw new Error(
                    "Debes colocar el pais en el que se establece tu empresa."
                );
            }
            return true;
        }),

        check("province").custom((value, { req }) => {
            if (!req.body.province) {
                throw new Error(
                    "Debes colocar la provincia en el que se establece tu empresa."
                );
            }
            return true;
        }),
        check("email")
            .isEmail()
            .withMessage("Debes ingresar un mail valido.")
            .custom(async (value) => {
                await paramExists(value, "email", CellarUser);
                await paramExists(value, "email", BuyerUser);
            }),
        check("password")
            .isLength(8)
            .withMessage(
                "Debes ingresar una contraseña de al menos 8 caracteres."
            ),
        check("image")
            .custom((value, { req }) => {
                if (!req.file) {
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
router.get("/perfil", isLoggedIn, usersController.showProfile);
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

router.post("/crearDireccion", isLoggedIn, usersController.newAddress);
router.put("/editarDireccion/:id", isLoggedIn, usersController.editAddress);
router.delete(
    "/eliminarDireccion/:id",
    isLoggedIn,
    usersController.deleteAddress
);
module.exports = router;
