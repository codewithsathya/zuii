const { createError } = require("../error");
const Order = require("../models/order.model");
const User = require("../models/user.model");

exports.listOrders = async (req, res, next) => {
  try {
    let currUser = await User.findById(req.userId);

    // console.log(currUser);

    // currUser = await Address.populate(currUser, {
    //   path: "orders.pickUpPoint orders.deliveryPoint",
    //   select: "_id latitude longitude",
    // });

    // currUser = await Drone.populate(currUser, {
    //   path: "orders.assignedDrone",
    //   select: "_id isAvailable currentLocation",
    // });

    res.status(200).json({ orders: currUser.orders });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.requests = async (req, res, next) => {
  try {
    const currUser = await User.findById(req.userId);
    if (!currUser.isAdmin) {
      return next(createError(403, "You are unauthorized"));
    }

    const orders = await Order.find().populate({
      path: "createdBy",
      options: { autopopulate: false },
      select: "-orders",
    });

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.test = async (req, res, next) => {
  console.log(req.userId);
};
