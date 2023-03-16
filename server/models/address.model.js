const mongoose = require('mongoose')
const validator = require('validator')

const addressSchema = mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
})

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;