require("dotenv").config();
const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../config/passport");
const JWT = require("jsonwebtoken");
const models = require("../models");

const signToken = (userID) => {
    return JWT.sign(
        {
            iss: "NoobCoder",
            sub: userID,
        },
        "NoobCoder",
        { expiresIn: "1h" }
    );
};

userRouter.post("/register", (req, res) => {
    const { username, password, role, firstName, lastName, email } = req.body;
    models.User.findOne({ username }, (err, user) => {
        if (err) res.status(500).json({ message: { msgBody: "Error has occurred", msgError: "error" } });
        if (user) res.status(400).json({ message: { msgBody: "Username is already taken", msgError: "error" } });
        else {
            const newUser = new models.User({ username, password, role, firstName, lastName, email });
            newUser.save((err) => {
                if (err) res.status(500).json({ message: { msgBody: "Error has occurred", msgError: "error" } });
                else res.status(201).json({ message: { msgBody: "Account successfully created", msgError: "" } });
            });
        }
    });
});

userRouter.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username, role } = req.user;
        const token = signToken(_id);
        res.cookie("access_token", token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
});

userRouter.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
});

userRouter.post("/calendar", passport.authenticate("jwt", { session: false }), (req, res) => {
    const calendar = new models.Calendar(req.body);
    calendar.save((err) => {
        if (err) res.status(500).json({ message: { msgBody: "Error has occurred", msgError: "error" } });
        else {
            req.user.events.push(calendar);
            req.user.save((err) => {
                if (err) res.status(500).json({ message: { msgBody: "Error has occurred", msgError: "error" } });
                else res.status(200).json({ message: { msgBody: "Successfully created calendar", msgError: "" } });
            });
        }
    });
});

userRouter.get("/events", passport.authenticate("jwt", { session: false }), (req, res) => {
    models.User.findById({ _id: req.user._id })
        .populate("events")
        .exec((err, document) => {
            if (err) res.status(500).json({ message: { msgBody: "Error has occurred", msgError: "" } });
            else {
                res.status(200).json({ events: document.events, authenticated: "You are authenticated" });
            }
        });
});

userRouter.get("/admin", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role === "admin") {
        res.status(200).json({ message: { msgBody: "You are an admin", msgError: "" } });
    } else res.status(403).json({ message: { msgBody: "You are not an admin, sorry", msgError: "error" } });
});

userRouter.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
});

userRouter.get("/info", (req, res) => {
    if (!req.user) return res.status(401).end();

    models.User.find({}, { "local.username": 1, "local.online": 1, _id: 0 }, (err, users) => {
        if (err) {
            return res.status(500).json({ error: true });
        }

        res.json(users);
    });
});

userRouter.get("/:username", (req, res) => {
    req.params.username = req.params.username.toLowerCase();

    models.User.findOne(
        {
            "local.username": req.params.username,
        },
        (err, user) => {
            if (err) {
                return res.status(500).json({ error: true });
            }

            return res.json({ alreadyInUse: !!user });
        }
    );
});

userRouter.get("/channels", (req, res) => {
    if (!req.user) return res.status(401).end();

    models.User.findOne({ "local.username": req.user }, { "local.channels": 1, _id: 0 }, (err, channels) => {
        if (err) {
            return res.status(500).json({ error: true });
        }

        res.json(channels);
    });
});

userRouter.get("/:name/messages", (req, res) => {
    if (!req.user) return res.status(401).end();

    req.params.name = req.params.name.toLowerCase();

    models.User.findOne({
        "local.username": req.user,
        "local.channels": req.params.name,
    })
        .exec()
        .then((user) => {
            if (user) {
                return models.Message.find({ channel: req.params.name }).exec();
            }
            throw "Not joined to channel";
        })
        .then((messages) => res.json(messages))
        .then(null, (error) => {
            res.status(401).json({ error });
        });
});

module.exports = userRouter;
