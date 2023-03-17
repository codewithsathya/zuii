const Drone = require("../models/drone.model");
const Order = require("../models/order.model");

exports.getFreeDrones = async (req, res, next) => {
  try {
    const drones = await Drone.find({ isAvailable: true });

    res.status(200).json({ numberOfFree: drones.length, drones });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.freeDrone = async (req, res, next) => {
  const { orderId } = req.body;
  try {
    const order = await Order.findById(orderId);
    const drone = await Drone.findByIdAndUpdate(
      order.assignedDrone._id,
      { isAvailable: true },
      { new: true }
    );

    res.status(200).json(drone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
