const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", isLoggedIn, cartController.showCart);

router.get("/guardados", isLoggedIn, cartController.showSaved);

router.post("/agregar/:id", cartController.addToOrder);

router.post("/agregar", isLoggedIn, cartController.addToOrder);
// router.post("/agregar", isLoggedIn, cartController.addToCart);

module.exports = router;
