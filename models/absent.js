const mongoose = require('mongoose');

const absentSchema = new mongoose.Schema({
    student_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ["P", "A"],
        default: "A",
        required: true
    }
}, {
    timestamps: true
});

const Absent = mongoose.model('Absent', absentSchema);
module.exports = Absent;