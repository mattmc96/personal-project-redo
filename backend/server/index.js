require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("../routes/User");
// const chatroomRoutes = require("../routes/Chatroom");
// configureRoutes = require("../routes/PaymentConfig");
const morgan = require("morgan");
// const pusher = require("pusher");

const { SERVER_PORT, CONNECTION_STRING } = process.env;
const port = SERVER_PORT || 9000;
const uri = CONNECTION_STRING;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/user", userRouter);
// app.use("/chatroom", chatroomRoutes);
// configureRoutes(app);

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
