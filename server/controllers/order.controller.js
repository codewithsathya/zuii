const Address = require("../models/address.model");
const Drone = require("../models/drone.model");
const User = require("../models/user.model")
const Order = require("../models/order.model");
const { startDrone } = require("../drone-api");
const { baseStationLocation } = require("../config");

exports.book = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { pickupAddressId, deliveryAddressId }= req.body
        let pickupAddress, deliveryAddress;
        console.log(req.body)

        if(pickupAddressId){
            pickupAddress = await Address.findOne({ _id: pickupAddressId })
        }else{
            let { pickupLatitude, pickupLongitude } = req.body;
            if(!pickupLatitude || !pickupLongitude){
                throw new Error("coordinates-missing");
            }
            pickupAddress = new Address({latitude: pickupLatitude, longitude: pickupLongitude});
            pickupAddress = await pickupAddress.save();
        }

        if(deliveryAddressId){
            deliveryAddress = await Address.findOne({ _id: deliveryAddressId })
        }else{
            let { deliveryLatitude, deliveryLongitude } = req.body;
            if(!deliveryLatitude || !deliveryLongitude){
                throw new Error("coordinates-missing");
            }
            deliveryAddress = new Address({latitude: deliveryLatitude, longitude: deliveryLongitude});
            deliveryAddress = await deliveryAddress.save();
        }
        let newOrder = new Order({
            createdBy: userId,
            pickupLocation: pickupAddress._id,
            deliveryLocation: deliveryAddress._id,
        });
        newOrder = await newOrder.save();

        res.status(200).json(newOrder);
        next();
    } catch (error) {
        res.json({"error": error.message});
    }
}

exports.track = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.acceptOrder = async (req, res, next) => {
    try {
        const userId = req.userId;
        let user = await User.findById(userId);
        if(!user.isAdmin){
            throw new Error("not-admin");
        }
        const { orderId } = req.body;
        let order = Order.findById(orderId);
        if(!order){
            throw new Error("order-not-found");
        }
        if(order.status === "rejected"){
            throw new Error("order-already-rejected")
        }
        if(order.status === "accepted"){
            throw new Error("order-already-accepted")
        }
        let availableDrone = await Drone.findOneAndUpdate({isAvailable: true}, {isAvailable: false});
        if(!availableDrone){
            throw new Error("no-available-drones");
        }
        let updatedOrder = await Order.findByIdAndUpdate(orderId, { status: "accepted", assignedDrone: availableDrone._id }, { new: true });
        // starts dummy drone
        startDrone(availableDrone._id, baseStationLocation, order.pickupLocation, order.deliveryLocation);
        res.status(200).json({"status": "order-accepted", ...updatedOrder})
        next();
    } catch (error) {
        switch(error.message){
            case "not-admin":
                res.status(401).json({"error": error.message})
                break;
            case "order-not-found" || "order-already-rejected" || "order-already-accepted" || "no-available-drones":
                res.status(404).json({"error": error.message});
                break;
        }
    }
}

exports.rejectOrder = async (req, res, next) => {
    try {
        const userId = req.userId;
        let user = await User.findById(userId);
        if(!user.isAdmin){
            throw new Error("not-admin");
        }
        const { orderId } = req.body;
        let order = Order.findById(orderId);
        if(!order){
            throw new Error("order-not-found");
        }
        if(order.status === "rejected"){
            throw new Error("order-already-rejected")
        }
        if(order.status === "accepted"){
            throw new Error("order-already-accepted")
        }
        await Order.findByIdAndUpdate(orderId, { status: "rejected" });
        res.status(200).json({"status": "order-rejected"})
        next();
    } catch (error) {
        switch(error.message){
            case "not-admin":
                res.status(401).json({"error": error.message})
                break;
            case "order-not-found" || "order-already-rejected" || "order-already-accepted":
                res.status(404).json({"error": error.message});
                break;
        }
    }
}