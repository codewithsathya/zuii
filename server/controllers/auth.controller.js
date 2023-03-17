const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config")

exports.googleLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email })
        if(user){
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user._id
                },
                `${process.env.JWT_SECRET_KEY}`,
                {
                    expiresIn: "24h"
                }
            )
            res.cookie("access_token", token, { httpOnly: true }).status(200).json({ result: user, token });
        }else{
            const newUser = new User({
                ...req.body,
                // isAdmin: config.adminMails.includes(req.body.email)
            })
            const savedUser = await newUser.save();
            const token = jwt.sign(
                {
                    email: savedUser.email,
                    id: savedUser._id
                },
                `${process.env.JWT_SECRET_KEY}`,
                {
                    expiresIn: "24h"
                }
            )

            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(201)
                .json({ result: savedUser})
        }
    } catch (error) {
        next(error)
    }
}