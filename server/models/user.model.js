const mongoose = require('mongoose')
const validator = require('validator')
const autopopulate = require("mongoose-autopopulate")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    profilePic: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid-email')
            }
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Order",
        autopopulate: true
    }
}, { timings: true });

userSchema.plugin(autopopulate);

const User = mongoose.model("User", userSchema);
module.exports = User;