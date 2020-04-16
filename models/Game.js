const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
    },
    stroke: {
        type: [String],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('game', GameSchema);