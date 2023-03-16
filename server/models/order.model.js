const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  pickUpPoint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  deliveryPoint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  assignedDrone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drone",
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
