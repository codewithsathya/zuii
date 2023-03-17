const Address = require("../models/address.model");
const Drone = require("../models/drone.model");
const User = require("../models/user.model");
const Order = require("../models/order.model");
const { startDrone } = require("../drone-api");
const { baseStationLocation } = require("../config");

exports.book = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { pickupAddressId, deliveryAddressId } = req.body;
    let pickupAddress, deliveryAddress;
    console.log(req.body);

    if (pickupAddressId) {
      pickupAddress = await Address.findOne({ _id: pickupAddressId });
    } else {
      let { pickupLatitude, pickupLongitude } = req.body;
      if (!pickupLatitude || !pickupLongitude) {
        throw new Error("coordinates-missing");
      }
      pickupAddress = new Address({
        latitude: pickupLatitude,
        longitude: pickupLongitude,
      });
      pickupAddress = await pickupAddress.save();
    }

    if (deliveryAddressId) {
      deliveryAddress = await Address.findOne({ _id: deliveryAddressId });
    } else {
      let { deliveryLatitude, deliveryLongitude } = req.body;
      if (!deliveryLatitude || !deliveryLongitude) {
        throw new Error("coordinates-missing");
      }
      deliveryAddress = new Address({
        latitude: deliveryLatitude,
        longitude: deliveryLongitude,
      });
      deliveryAddress = await deliveryAddress.save();
    }
    let newOrder = new Order({
      createdBy: userId,
      pickUpPoint: pickupAddress._id,
      deliveryPoint: deliveryAddress._id,
    });
    newOrder = await newOrder.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: {
        orders: newOrder._id,
      },
    });

    res.status(200).json(newOrder);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.track = async (req, res) => {
  try {
  } catch (error) {}
};

exports.acceptOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    let user = await User.findById(userId);
    if (!user.isAdmin) {
      throw new Error("not-admin");
    }

    const { orderId } = req.body;
    let order = await Order.findById(orderId);

    if (!order) {
      throw new Error("order-not-found");
    }
    if (order.status === "rejected") {
      throw new Error("order-already-rejected");
    }
    if (order.status === "accepted") {
      throw new Error("order-already-accepted");
    }

    let availableDrone = await Drone.findOneAndUpdate(
      { isAvailable: true },
      { isAvailable: false }
    );

    if (!availableDrone) {
      throw new Error("no-available-drones");
    }

    let updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "accepted", assignedDrone: availableDrone._id },
      { new: true }
    );

    updatedOrder = await User.populate(updatedOrder, {
      path: "createdBy",
      options: { autopopulate: false },
      select: "-orders",
    });

    let pickupLocation = {
      lat: order.pickUpPoint.latitude,
      lng: order.pickUpPoint.longitude,
    };
    let deliveryLocation = {
      lat: order.deliveryPoint.latitude,
      lng: order.deliveryPoint.longitude,
    };

    // starts dummy drone
    const timeToFree = startDrone(
      availableDrone._id,
      baseStationLocation,
      pickupLocation,
      deliveryLocation
    );
    res
      .status(200)
      .json({ status: "order-accepted", updatedOrder, timeToFree });
  } catch (error) {
    switch (error.message) {
      case "not-admin":
        res.status(401).json({ error: error.message });
        break;
      default:
        res.status(404).json({ error: error.message });
        break;
    }
  }
};

exports.rejectOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    let user = await User.findById(userId);
    if (!user.isAdmin) {
      throw new Error("not-admin");
    }
    const { orderId } = req.body;
    let order = await Order.findById(orderId);
    if (!order) {
      throw new Error("order-not-found");
    }
    if (order.status === "rejected") {
      throw new Error("order-already-rejected");
    }
    if (order.status === "accepted") {
      throw new Error("order-already-accepted");
    }
    await Order.findByIdAndUpdate(orderId, { status: "rejected" });
    res.status(200).json({ status: "order-rejected" });
  } catch (error) {
    switch (error.message) {
      case "not-admin":
        res.status(401).json({ error: error.message });
        break;
      default:
        res.status(404).json({ error: error.message });
        break;
    }
  }
};
