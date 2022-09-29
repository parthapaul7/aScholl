const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    loginAttempts: {
        type: Number,
        required: true
    },
    lockUntil: {
        type: Number
    },
    role: {
        type: String,
        required: true,
        default: "Patient"
    }
}, {
    timestamps: true
});



var User = mongoose.model('User', UserSchema);
module.exports = User;