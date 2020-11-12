require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(cors());
app.use(express.json());

const { SERVER_PORT, CONNECTION_STRING } = process.env;

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("successfully connected to database");
});

// TODO hopefully refraction in routes didnt cause bug

const userRouter = require("../routes/User");
app.use("/user", userRouter);

app.listen(SERVER_PORT, () => {
    console.log(`Server connected on port: ${SERVER_PORT}`);
});
