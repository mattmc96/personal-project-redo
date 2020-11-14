require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRouter = require("../routes/User");
const configureRoutes = require("../routes");

const app = express();
const io = require("socket-io")(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

configureRoutes(app);

const { SERVER_PORT, CONNECTION_STRING } = process.env;

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("successfully connected to database");
});

app.use("/user", userRouter);

io.sockets.on("error", (e) => console.log(e));
app.listen(SERVER_PORT, () => {
    console.log(`Server connected on port: ${SERVER_PORT}`);
});
