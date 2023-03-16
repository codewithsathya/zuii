const express = require("express");
const orderController = require("../controllers/order.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/book", auth, orderController.book);
router.get("/token", auth, (req, res) => {
    console.log("Hello wojsaskjdkgjak")
    res.send("Hello world");
});

module.exports = router;