const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
const {
    BuyerUser,
    CellarUser,
    Address,
    OrderItem,
    Status,
    Order,
} = require("../database/models");

////////FUNCTIONS
const getOrderItems = require("../utils/getOrderItems");
const { Op } = require("sequelize");

function logOut(req, res, redirectPath) {
    res.clearCookie("rememberBuyer");
    res.clearCookie("rememberCellar");
    res.locals.user = null;
    req.session.destroy((err) => {
        res.redirect(redirectPath);
    });
}

async function findUser(model, req) {
    return await model.findOne({
        where: {
            email: req.body.email,
        },
    });
}

function checkHash(user, req) {
    if (bcrypt.compareSync(req.body.password, user.password)) return true;
}
function validateAndStoreInSession(user, req) {
    if (user && checkHash(user, req)) {
        req.session.loggedUser = user;
    }
    return user;
}

async function updatePassword(user, req, checkHash) {
    if (checkHash(user, req)) {
        await user.update(
            {
                password: bcrypt.hashSync(req.body.newPassword, 10),
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
    }
}

///////////////////////////

const usersControllers = {
    showRegister: (req, res) => {
        res.render("users/signup");
    },
    newUser: async (req, res) => {
        const errors = validationResult(req);
        try {
            if (errors.isEmpty()) {
                const newBuyerUser = await BuyerUser.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    dni: req.body.dni,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    image: req.file.filename,
                });
                req.session.loggedUser = newBuyerUser;
                res.locals.user = newBuyerUser;
                res.redirect("/productos");
            } else {
                console.log(errors);
                res.render("users/signUp");
            }
        } catch (err) {
            console.log(err);
            res.render("error");
        }
    },
    newUserWineCellar: async (req, res) => {
        const errors = validationResult(req);
        try {
            if (errors.isEmpty()) {
                const newCellarUser = await CellarUser.create({
                    cellarName: req.body.cellarName,
                    companyName: req.body.companyName,
                    cuit: req.body.cuit,
                    country: req.body.country,
                    province: req.body.province,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    image: req.file.filename,
                });
                req.session.loggedUser = newCellarUser;
                console.log("aqui");
                res.redirect("/productos");
            } else {
                console.log(errors);
                res.render("users/signupWineCellar");
            }
        } catch (err) {
            console.log(err);
            res.render("error");
        }
    },

    showRegisterWineCellar: (req, res) => {
        res.render("users/signupWineCellar");
    },
    showLogin: (req, res) => {
        res.render("users/login");
    },
    logIn: async (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            let msg = "Credenciales invalidas.";

            const buyerUser = await BuyerUser.findOne({
                where: {
                    email: req.body.email,
                },
            });
            const cellarUser = await findUser(CellarUser, req);

            const user = validateAndStoreInSession(
                buyerUser || cellarUser,
                req
            );
            ///////////////////////////////////////
            if (!req.session.loggedUser) {
                res.render("users/login", {
                    errorMsg: msg,
                });
            } else if (req.body.remember && req.session.loggedUser.dni) {
                res.cookie("rememberBuyer", req.session.loggedUser.id, {
                    maxAge: 60 * 1000 * 60 * 24,
                });

                //if (req.session.loggedUser.dni) {
                // req.session.loggedUser.isUser = true;

                //}
            } else if (req.body.remember && req.session.loggedUser.cuit) {
                res.cookie("rememberCellar", req.session.loggedUser.id, {
                    maxAge: 60 * 1000 * 60 * 24,
                });
            }
            res.locals.user = req.session.loggedUser;
            res.redirect(`/usuarios/perfil`);
        } else {
            res.render("users/login", { errors: errors.errors });
        }
    },
    logOut: (req, res) => {
        logOut(req, res, "/");
    },
    showProfile: async (req, res) => {
        const paidStatus = await Status.findOne({
            where: {
                name: "rejected",
            },
        });
        if (req.session.loggedUser.dni) {
            const userData = await BuyerUser.findByPk(
                req.session.loggedUser.id,
                {
                    include: [
                        "addresses",
                        {
                            model: Order,
                            as: "orders",
                            where: { statusId: { [Op.not]: paidStatus } },
                            required: false,
                        },
                    ],
                    order: [[["orders", "statusId", "ASC"]]],
                }
            );

            const orderItems = await getOrderItems(userData, OrderItem);
            return res.render("users/profile", { user: userData, orderItems });
        } else {
            const userData = await CellarUser.findByPk(
                req.session.loggedUser.id,
                {
                    include: ["products"],
                }
            );
            return res.render(`users/profile`, { user: userData });
        }
    },

    changePassword: async (req, res) => {
        if (res.locals.user.cuit) {
            const cellarUser = await CellarUser.findByPk(req.params.id);
            await updatePassword(cellarUser, req, checkHash);
            logOut(req, res, "/usuarios/login");
        }
        const buyerUser = await BuyerUser.findByPk(req.params.id);

        await updatePassword(buyerUser, req, checkHash);
        logOut(req, res, "/usuarios/login");
    },
    editAddress: async (req, res) => {
        try {
            await Address.update(
                {
                    ...req.body,
                    buyerUserId: res.locals.user.id,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            );
        } catch (err) {
            console.log(err);
            res.render("error");
        }

        res.redirect("/usuarios/perfil");
    },
    newAddress: async (req, res) => {
        try {
            await Address.create({
                ...req.body,
                buyerUserId: res.locals.user.id,
            });
            res.redirect("/usuarios/perfil");
        } catch (err) {
            console.log(err);
            res.render("error");
        }
    },
    deleteAddress: async (req, res) => {
        await Address.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.redirect("/usuarios/perfil");
    },
};

module.exports = usersControllers;
