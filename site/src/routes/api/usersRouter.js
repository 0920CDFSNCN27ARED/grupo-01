const express = require("express");
const router = express.Router();

const controller = require("../../controllers/api/usersController");

router.get("/count", controller.count);

module.exports = router;
