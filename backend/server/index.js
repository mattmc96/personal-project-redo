require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("../routes/User");
const helmet = require("helmet");
const session = require("express-session");
const passportSocketIo = require("passport.socketio");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const debug = require("debug")("server");

const { SERVER_PORT, CONNECTION_STRING } = process.env;
const port = SERVER_PORT || 9000;
const uri = CONNECTION_STRING;

const sessionSettings = {
    key: "express.sid",
    // store?
    secret: "thisKSDOFksNeI",
    cookie: { httpOnly: false },
};
// Middlewares
const middlewares = [
    morgan("dev"),
    helmet(),
    cors(),
    express.json(),
    express.urlencoded({ extended: true }),
    session(sessionSettings),
    cookieParser(),
    express.json(),
];
middlewares.forEach((middleware) => app.use(middleware));

// Route Middlewares
app.use("/user", userRouter);

io.use(
    passportSocketIo.authorize({
        key: "express.sid",
        // secret: ,
        store: sessionStore,
        success: (data, accept) => accept(),
        fail: (data, message, error, accept) => {
            if (error) {
                debug(`error: ${message}`);

                accept(new Error("Unauthorized"));
            } else {
                debug(`ok: ${message}`);
                accept(new Error("Unauthorized"));
            }
        },
    })
);

app.listen(port, (err) => {
    if (err) console.log("Error in server setup");
    console.log(`👨 To Infinity & Beyond on Port => ${port}`);

    try {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    } catch (error) {
        console.error(error);
    }

    mongoose.connection.on("error", (e) => {
        console.log("mongo connect error!");
    });
    mongoose.connection.on("connected", () => {
        console.log("🚀 DB Blasting Off");
    });
});
