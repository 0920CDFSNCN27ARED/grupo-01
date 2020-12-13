const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController")


router.get("/", cartController.showCart)

router.get("/guardados",cartController.showSaved)

module.exports = router;