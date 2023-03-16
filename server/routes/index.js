const express = require("express")
const userRoute = require("./user.route")
const orderRoute = require("./order.route")

const router = express.Router();

const routes = [
    {
        path: "/user",
        route: userRoute,
    },
    {
        path: "/order",
        route: orderRoute,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
