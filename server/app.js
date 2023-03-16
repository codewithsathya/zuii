const express = require("express")
const helmet = require("helmet")
const xss = require("xss-clean")
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const path = require('path')
const app = express();
const routes = require('./routes')

// Security
app.use(helmet())

// Parsing
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Data sanitization
app.use(mongoSanitize())
app.use(xss())

// Cors
app.use(cors())
app.use('*', cors())

// Routes
app.use('/api', routes)

const dirname = path.resolve("..")
app.use(express.static(path.join(dirname, "/client/build")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirname, "client", "build", "index.html"))
})

module.exports = app;