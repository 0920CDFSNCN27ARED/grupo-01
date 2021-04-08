const express = require("express");
const router = express.Router();

const controller = require("../../controllers/api/usersController");

router.get("/", controller.showAll);
router.get("/count", controller.count);
router.get("/:id", controller.getById);

module.exports = router;
