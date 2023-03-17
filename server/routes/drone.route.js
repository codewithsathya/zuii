const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const droneController = require("../controllers/drone.controller");

router.get("/available", auth, droneController.getFreeDrones);

module.exports = router;
