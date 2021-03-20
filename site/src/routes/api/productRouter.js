const express = require("express");
const router = express.Router();

const controller = require("../../controllers/api/productsController");

router.get("/latest", controller.latest);
router.get("/offers", controller.offers);
router.get("/count", controller.count);
router.get("/totalPrice", controller.totalPrice);
router.get("/:id",controller.getOne);
module.exports = router;
