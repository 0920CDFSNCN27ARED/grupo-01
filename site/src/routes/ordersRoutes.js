const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/ordersController");

router.get("/mercadopago/exito/:id", ordersController.success);
router.get("/mercadopago/pendiente/:id", ordersController.pending);
router.get("/mercadopago/rechazada/:id", ordersController.failure);

module.exports = router;
