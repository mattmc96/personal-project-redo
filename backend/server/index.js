require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const app = express()
app.use(cookieParser())
app.use(express.json())

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('successfully connected to database')
})

const userRouter = require('./routes/User')
app.use('/user', userRouter)

// passportConfig(passport)
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//     },
//     store: new SequelizeStore({
//         db: sequelize,
//         table: 'Session',
//     }),
// }))
// app.use(passport.initialize())
//
// app.use(passport.session())

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server connected on port: ${PORT}`))
