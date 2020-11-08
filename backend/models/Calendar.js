const mongoose = require('mongoose')

const CalendarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})


module.exports = mongoose.model('Calendar', CalendarSchema)









