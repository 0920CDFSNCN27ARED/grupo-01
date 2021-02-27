const express = require("express");
const router = express.Router();

const controller = require("../../controllers/api/productsController");

router.get("/latest", controller.latest);
router.get("/offers", controller.offers);

module.exports = router;
