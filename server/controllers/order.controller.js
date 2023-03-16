const auth = require("../middlewares/auth");
const Address = require("../models/address.model");
const Drone = require("../models/drone.model");
const User = require("../models/user.model")
const Order = require("../models/order.model")

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
                throw new Error("Latitude/longitude missing");
            }
            pickupAddress = new Address({latitude: pickupLatitude, longitude: pickupLongitude});
            pickupAddress = await pickupAddress.save();
        }

        if(deliveryAddressId){
            deliveryAddress = await Address.findOne({ _id: deliveryAddressId })
        }else{
            let { deliveryLatitude, deliveryLongitude } = req.body;
            if(!deliveryLatitude || !deliveryLongitude){
                throw new Error("Latitude/longitude missing");
            }
            deliveryAddress = new Address({latitude: deliveryLatitude, longitude: deliveryLongitude});
            deliveryAddress = await deliveryAddress.save();
        }

        let availableDrone = await Drone.findOneAndUpdate({isAvailable: true}, {isAvailable: false});
        if(!availableDrone){
            throw new Error("No available drones");
        }

        let newOrder = new Order({
            createdBy: userId,
            pickUpPoint: pickupAddress._id,
            deliveryPoint: deliveryAddress._id,
            assignedDrone: availableDrone._id
        });
        newOrder = await newOrder.save();

        newOrder = await Order.findById(newOrder._id);
        res.status(200).json(newOrder);
        next();
    } catch (error) {
        console.log(error);
    }
}