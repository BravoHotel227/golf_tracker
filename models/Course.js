const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    par: {
        type: Number,
        required: true
    },
    holePar: {
        type: [String],
        required: true
    },
    holeMeters: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }

})

module.exports = mongoose.model('course', CourseSchema);