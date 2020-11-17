require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRouter = require("../routes/User");
const chatroomRoutes = require("../routes/Chatroom");
const configureRoutes = require("../routes/PaymentConfig");
// const errorHandlers = require("../handlers/errorHandlers");

const app = express();

// Error handlers
// app.use(errorHandlers.notFound);
// if (process.env.ENV === "DEVELOPMENT") {
//     app.use(errorHandlers.developmentErrors);
// } else {
//     app.use(errorHandlers.productionErrors);
// }

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/user", userRouter);
app.use("/chatroom", chatroomRoutes);
configureRoutes(app);

const { SERVER_PORT, CONNECTION_STRING } = process.env;

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("successfully connected to database");
});

app.listen(SERVER_PORT, () => {
    console.log(`Server connected on port: ${SERVER_PORT}`);
});
