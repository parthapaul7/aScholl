const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    absent:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Absent',
    }],
    marks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marks',
    }],
    performance:{
        type : String,
    },
    id_card: {
        type: String,
    },
    monthly_fees: {
        type: Number,
    },
    role: {
        type: String,
        required: true,
        enum: ["Student", "Teacher", "Admin"],
        default: "Student"
    }
}, {
    timestamps: true
});



var User = mongoose.model('User', UserSchema);
module.exports = User;