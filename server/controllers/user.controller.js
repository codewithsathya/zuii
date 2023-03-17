const { createError } = require("../error");
const Address = require("../models/address.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");

exports.listOrders = async (req, res, next) => {
  try {
    let currUser = await User.findById(req.userId);

    // console.log(currUser);

    // currUser = await Address.populate(currUser, {
    //   path: "orders.pickupLocation orders.deliveryLocation",
    //   select: "_id latitude longitude",
    // });

    // currUser = await Drone.populate(currUser, {
    //   path: "orders.assignedDrone",
    //   select: "_id isAvailable currentLocation",
    // });

    // let orders = currUser.orders;
    currUser = await Address.populate(currUser, {
      path: "orders.pickUpPoint",
      select: "latitude longitude",
    });

    currUser = await Address.populate(currUser, {
      path: "orders.deliveryPoint",
      select: "latitude longitude",
    });

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

    let orders = await Order.find().populate({
      path: "createdBy",
      options: { autopopulate: false },
      select: "-orders",
    });

    orders = await Address.populate(orders, {
      path: "pickUpPoint",
      select: "latitude longitude",
    });

    orders = await Address.populate(orders, {
      path: "deliveryPoint",
      select: "latitude longitude",
    });

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.test = async (req, res, next) => {
  console.log(req.userId);
};
