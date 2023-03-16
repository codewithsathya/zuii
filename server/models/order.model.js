const mongoose = require('mongoose')
const validator = require('validator')

const orderSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    pickUpPoint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    deliveryPoint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
})