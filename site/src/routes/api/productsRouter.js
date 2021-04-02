const express = require("express");
const router = express.Router();

const controller = require("../../controllers/api/productsController");

router.get("/", controller.showAll);
router.get("/list", controller.list);
router.get("/:id", controller.getById);
module.exports = router;
