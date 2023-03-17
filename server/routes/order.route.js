const express = require("express");
const orderController = require("../controllers/order.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/book", auth, orderController.book);

router.post("/acceptOrder", auth, orderController.acceptOrder)

router.post("/rejectOrder", auth, orderController.rejectOrder)

module.exports = router;