const auth = require("../middlewares/auth");
const Address = require("../models/address.model");
const User = require("../models/user.model")

exports.book = async (req, res, next) => {
    try {
        const userId = req.userId;
        const addressId = req.body.addressId;
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
    } catch (error) {
        
    }
}