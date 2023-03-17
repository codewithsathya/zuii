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

let server, io;
const postMongoConnection = () => {
    server = app.listen(port, () => console.log(`Listening to port ${port}`));
    io = require("socket.io")(server, {
        pingTimeout: 60000,
        cors: {
            origin: process.env.NODE_ENV === 'production' ? "https://zuii.codewithsathya.com": "http://localhost:3000"
        }
    })

    io.on("connection", (socket) => {
        console.log("Connected to socket")
        socket.on("setup", (token) => {
            try {
                let userId = jwt.verify(token, process.env.JWT_SECRET_KEY);
                socket.join(userData._id);
                socket.emit("connected");
            } catch (error) {
                socket.emit("failed");
            }
        })

        socket.on("getlocation", () => {

        })
    })
}
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
.then(postMongoConnection)
.catch(error => {
    throw error
});
