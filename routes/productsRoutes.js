const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/", productsController.showAll);
router.get("/:id", productsController.showOne);
router.get("/create", productsController.newProduct);
router.get("/:id/edit", productsController.editProduct);

module.exports = router;
