const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();

router.post("/book", orderController.book);

module.exports = router;