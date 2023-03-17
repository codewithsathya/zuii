const { startDrone, getLocation } = require("./drone-api")

const baseStation = [20.149642, 85.673601];
const pickup = [20.148789, 85.665345];
const delivery = [20.152350, 85.667482];
const baseStationLocation = { latitude: baseStation[0], longitude: baseStation[1] }
const pickupLocation = { latitude: pickup[0], longitude: pickup[1]}
const deliveryLocation = { latitude: delivery[0], longitude: delivery[1]}

startDrone("drone1", baseStationLocation, pickupLocation, deliveryLocation);

setInterval(() => {console.log(getLocation("drone1"))}, 200);