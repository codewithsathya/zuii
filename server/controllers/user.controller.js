const Address = require("../models/address.model");
const Drone = require("../models/drone.model");
const User = require("../models/user.model");

exports.listOrders = async (req, res, next) => {
  try {
    let currUser = await User.findById(req.userId).populate("orders");

    console.log(currUser);

    currUser = await Address.populate(currUser, {
      path: "orders.pickUpPoint orders.deliveryPoint",
      select: "_id latitude longitude",
    });

    currUser = await Drone.populate(currUser, {
      path: "orders.assignedDrone",
      select: "_id isAvailable currentLocation",
    });

    res.status(200).json({ orders: currUser.orders });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
