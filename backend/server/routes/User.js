const express = require('express')
const UserRouter = express.Router()
const passport = require('passport')
const passportConfig = require('../../config/passport')
const JWT = require('jsonwebtoken')
const User = require('../../models/User')

userRouter.post('/register', (req, res) => {
    const { username, password, role } = req.body
    User.findOne({ username }, (err, user) => {
        if (err)
            res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } })
        if (user)
            res.status(400).json({ message: { msgBody: 'Error has occured', msgError: true } })
        else {
            const newUser = new User({ username, password, role })
            newUser.save(err => {
                if (err)
                    res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } })
                else
                    res.status(201).json({ message: { msgBody: 'Account successfully created', msgError: false } })
            })
        }
    })
})
