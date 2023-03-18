require("dotenv").config()
const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const app = express();
const routes = require("./routes");
const { getLocation, startDrone } = require("./drone-api");
const { baseStationLocation, adminMails } = require("./config");
const Drone = require("./models/drone.model");

// Security
app.use(helmet());

// Parsing
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data sanitization
app.use(mongoSanitize());
app.use(xss());

// Cors
app.use(cors());
app.use("*", cors());

// Routes
app.use("/api", routes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

// const dirname = path.resolve("..")
// app.use(express.static(path.join(dirname, "/client/build")))
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(dirname, "client", "build", "index.html"))
// })

const port = process.env.PORT || 3000;

function areSameAddress(location1, location2){
    if(location1.lat === location2.lat && location1.lng === location2.lng){
        return true;
    }else {
        return false;
    }
}

let server, io;
const postMongoConnection = () => {
    server = app.listen(port, () => console.log(`Listening to port ${port}`));
    io = require("socket.io")(server, {
        pingTimeout: 60000,
        cors: {
            origin: process.env.NODE_ENV === 'production' ? process.env.PROD_API_URL: process.env.DEVELOPMENT_API_URL
        }
    })

    io.on("connection", (socket) => {
        let droneId, userToken, orderDetails, isAdmin, userId;
        socket.on("setup", (order) => {
            console.log("Connected to socket")
            try {
                orderDetails = order;
                droneId = order.droneId;
                const decodedData = jwt.verify(order.userToken, `${process.env.JWT_SECRET_KEY}`)
                const email = decodedData.email;
                isAdmin = adminMails.includes(email);
                
                socket.join(order.id);
                socket.emit("connected");
            } catch (error) {
                socket.emit("failed");
            }
        })


        socket.on("setupAdmin", (token) => {
            try {
                const decodedData = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
                isAdmin = adminMails.includes(decodedData.email);

                socket.join("admins");
                socket.emit("connected");
            } catch (error) {
                console.log(error);
                socket.emit("failed")
            }
        })

        socket.on("getlocation", () => {
            setInterval(() => {
                if(!droneId){
                    return;
                }
                let droneLocation = getLocation(droneId);
                if(!isAdmin && areSameAddress(droneLocation, orderDetails.deliveryLocation)){
                    socket.emit("order-delivered")
                    socket.leave();
                }
                socket.emit("locationupdate", droneLocation);
            }, 200)
        })

        socket.on("get-all-locations", async () => {
            let drones = await Drone.find();
            console.log(drones);
            if(isAdmin){
                setInterval(() => {
                    let arr = []
                    for(let drone of drones){
                        let droneLocation;
                        if(drone.isAvailable){
                            droneLocation = baseStationLocation;
                        }else{
                            droneLocation = getLocation(drone._id) || baseStationLocation;
                        }
                        arr.push(droneLocation);
                    }
                    socket.emit("update-locations", arr)
                }, 200)
            }else{
                socket.emit("authorization-error")
            }
        })

        socket.off("setup", () => {
            console.log("User disconnected");
            socket.leave();
        })

    })
}

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
    .then(postMongoConnection)
    .catch(error => {
        throw error
    });
