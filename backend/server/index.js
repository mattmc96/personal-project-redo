require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRouter = require("../routes/User");
const configureRoutes = require("../routes");

const app = express();

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

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

let broadcaster;

io.sockets.on("connection", (socket) => {
    socket.on("broadcaster", () => {
        broadcaster = socket.id;
        socket.broadcast.emit("broadcaster");
    });
    socket.on("watcher", () => {
        socket.to(broadcaster).emit("watcher", socket.id);
    });
    socket.on("disconnect", () => {
        socket.to(broadcaster).emit("disconnectPeer", socket.id);
    });

    socket.on("offer", (id, message) => {
        socket.to(id).emit("offer", socket.id, message);
    });
    socket.on("answer", (id, message) => {
        socket.to(id).emit("answer", socket.id, message);
    });
    socket.on("candidate", (id, message) => {
        socket.to(id).emit("candidate", socket.id, message);
    });
});

io.sockets.on("error", (e) => console.log(e));

server.listen(SERVER_PORT, () => {
    console.log(`Server connected on port: ${SERVER_PORT}`);
});
