const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

router.post("/googleLogin", authController.googleLogin);

router.post("/test", auth, userController.testController);

module.exports = router;
