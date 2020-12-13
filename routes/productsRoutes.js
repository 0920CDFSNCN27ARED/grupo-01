const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/", productsController.showProducts);
router.get("/creacion", productsController.newProduct);
router.get("/edicion", productsController.editProduct);


module.exports = router;
