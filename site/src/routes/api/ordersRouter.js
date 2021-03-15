const express = require("express");
const router = express.Router();

const apiOrdersController = require("../../controllers/api/ordersController.js")

router.post("/checkout", apiOrdersController.createOrder);

module.exports = router;