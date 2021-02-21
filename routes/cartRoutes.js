const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", cartController.showCart);

router.get("/guardados", cartController.showSaved);

module.exports = router;
