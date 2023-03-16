const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const orderSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    // autopopulate: true
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
    autopopulate: true,
  },
  deliveryPoint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
    autopopulate: true,
  },
  assignedDrone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drone",
    required: true,
    autopopulate: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

orderSchema.plugin(autopopulate);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
