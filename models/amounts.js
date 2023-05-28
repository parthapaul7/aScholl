const mongoose = require('mongoose');

const amountSchema= new mongoose.Schema({
    type:{
        type: String,
        required: true,
        enum: ["Monthly Fees","Admission Fees","Exam Fees","Salary","Rent", "Other"],
    },
    flow:{
        type: String,
        required: true,
        enum: ["Debit","Credit"],
    },
    mode:{
        type: String,
        required: true,
        enum: ["Cash","Cheque","Online"],
    },
    amount:{
        type: Number,
        required: true,
    },
    expected_amount:{
        type: Number,
    },
    description:{
        type: String,
    },
    date:{
        type: Date,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    month:{
        type: String,
        enum: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    },
    year:{
        type: Number,
    },
    isPaid:{
        type: Boolean,
        default: false,
    },
},{ 
    timestamps: true
});

const Amount = mongoose.model('Amount', amountSchema);
module.exports = Amount;



