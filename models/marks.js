const mongoose = require('mongoose');

const marks= new mongoose.Schema({
    student_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    marks : {
        type: Number,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    exam : {
        type: String,
        required: true
    },
    class : {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


const Marks = mongoose.model('Marks', marks);
module.exports = Marks;
    



