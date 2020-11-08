require('dotenv').config()
const express = require('express')
const userRouter = express.Router()
const passport = require('passport')
const passportConfig = require('../config/passport')
const JWT = require('jsonwebtoken')
const User = require('../models/User')
const Calendar = require('../models/Calendar')

const signToken = userID => {
    return JWT.sign({
        iss: 'NoobCoder',
        sub: userID,
    }, "NoobCoder", { expiresIn: "1h" })
}

userRouter.post('/register', (req, res) => {
    const { username, password, role } = req.body
    User.findOne({ username }, (err, user) => {
        if (err)
            res.status(500).json({ message: { msgBody: 'Error has occurred', msgError: "error" } })
        if (user)
            res.status(400).json({ message: { msgBody: 'Username is already taken', msgError: "error" } })
        else {
            const newUser = new User({ username, password, role })
            newUser.save(err => {
                if (err)
                    res.status(500).json({ message: { msgBody: 'Error has occurred', msgError: "error" } })
                else
                    res.status(201).json({ message: { msgBody: 'Account successfully created', msgError: "" } })
            })
        }
    })
})

userRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username, role } = req.user
        const token = signToken(_id)
        res.cookie('access_token', token, { httpOnly: true, sameSite: true })
        res.status(200).json({ isAuthenticated: true, user: { username, role } })
    }
})

userRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token')
    res.json({ user: { username: '', role: '' }, success: true })
})

userRouter.post('/calendar', passport.authenticate('jwt', { session: false }), (req, res) => {
    const calendar = new Calendar(req.body)
    calendar.save(err => {
        if (err)
            res.status(500).json({ message: { msgBody: 'Error has occurred', msgError: "error" } })
        else {
            req.user.events.push(calendar)
            req.user.save(err => {
                if (err)
                    res.status(500).json({ message: { msgBody: 'Error has occurred', msgError: "error" } })

                else
                    res.status(200).json({ message: { msgBody: 'Successfully created calendar', msgError: "" } })
            })
        }
    })
})


userRouter.get('/events', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById({ _id: req.user._id }).populate('events').exec((err, document) => {
        if (err)
            res.status(500).json({ message: { msgBody: 'Error has occurred', msgError: "" } })
        else {
            res.status(200).json({ events: document.events, authenticated: "You are authenticated" })
        }
    })
})

userRouter.get('/admin', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role === 'admin'){
        res.status(200).json({ message: { msgBody: 'You are an admin', msgError: "" } })
    }
    else
        res.status(403).json({ message: {msgBody: "You are not an admin, sorry", msgError: "error" } })
})

userRouter.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { username, role } = req.user
    res.status(200).json({ isAuthenticated: true, user: { username, role } })
})

module.exports = userRouter

