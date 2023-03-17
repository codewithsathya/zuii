const mongoose = require("mongoose");

const droneSchema = mongoose.Schema({
    isAvailable: {
        type: Boolean,
        default: true,
    },
    currentLocation: {
        type: String,
        enum: ["storeroom", "pickup", "delivery"],
        default: "storeroom",
    },
});

const Drone = mongoose.model("Drone", droneSchema);
module.exports = Drone;
