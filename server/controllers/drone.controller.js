const Drone = require("../models/drone.model");

exports.getFreeDrones = async (req, res, next) => {
  try {
    const drones = await Drone.find({ isAvailable: true });

    res.status(200).json({ numberOfFree: drones.length, drones });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
