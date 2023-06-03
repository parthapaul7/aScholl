const mongoose = require('mongoose');

const library = new mongoose.Schema({
    book_name : {
        type: String,
        required: true,
    },
    book_id : {
        type: String,
        required: true,
    },
    quantity : {
        type: Number,
        required: true,
    },
    author : {
        type: String,
        required: true,
    },
    issued : [{
        issued_to : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        issued_on : {
            type: Date,
        },
        due_date : {
            type: Date,
        },
        returned_on : {
            type: Date,
        },
        fine : {
            type: Number,
        },
        status : {
            type: String,
            enum: ["Issued", "Returned"],
            default: "Issued"
        }, 
        }],

    status : {
        type: String,
        enum: ["Available", "Not Available"],
        default: "Available"
    },
}, {
    timestamps: true
});

const Library = mongoose.model('Library', library);
module.exports = Library;