const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orders: {
        type: [mongoose.Schema.ObjectId],
        ref: "Order"
    }
}, { timings: true });

const User = mongoose.model("User", userSchema);
module.exports = User;