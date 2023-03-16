const auth = require("../middlewares/auth");
const Address = require("../models/address.model");
const User = require("../models/user.model")

exports.book = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { pickupAddressId, deliveryAddressId }= req.body
        let pickupAddress, deliveryAddress;
        if(pickupAddressId){
            pickupAddress = await Address.findOne({ _id: pickupAddressId })
        }else{
            let { pickupLatitude, pickupLongitude } = req.body;
            
        }

        let address;
        if(addressId){
            address = await Address.findOne({ _id: addressId })
        }else{
            let latitude = req.body.latitude;
            let longitude = req.body.longitude;
            if(!latitude || !longitude){
                throw new Error("Latitude/longitude missing");
            }
            address = new Address({latitude, longitude})
            let newAddress = await address.save();
        }
        let newOrder = new Order({
            createdBy: userId,
            pickUpPoint
        });
    } catch (error) {
        
    }
}