const User = require('../models/user')
const Amount=  require('../models/amounts');

exports.getAmount = async(req, res, next) => {
    try {
        const amount= await Amount.find({...req.query});

       return res.status(200).json({
            status: "success",
            data: amount
       }); 
    } catch (error) {
        return res.status(404).json({
            status: "error",
            message: "No user found",
            error: error
        }); 
    }

}

exports.postAmount = async(req, res, next) => {
    // check req.body.date is valid date or not
    if(!Date.parse(req.body.date)){
        return res.status(400).json({
            status: "error",
            message: "Invalid date"
        });
    }

    const date = new Date(req.body.date);
    try{
        const amount = await  Amount.create({...req.body, date});
        // update the user
        const userUpdate = await User.updateOne({_id: req.body.user}, {$push: {monthly_fees: amount._id}});

        if(!userUpdate.acknowledged){
            // console.log(userUpdate  , amount);
            return res.status(400).json({
                status: "error",
                message: "User not found"
            });
        }

        return res.status(200).json({
            status: "success",
            data: amount
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
                status: "error",
                message: error.message,
        });
    }
}

exports.updateAmount = async(req, res, next) => {
    // check req.body.date is valid date or not
    if(!Date.parse(req.body.date)){
        return res.status(400).json({
            status: "error",
            message: "Invalid date"
        });
    }
    try{

        const date = new Date(req.body.date);

        const amount = await Amount.updateOne({_id: req.params.id}, {...req.body, date});

        if(!amount.acknowledged){
            return res.status(400).json({
                status: "error",
                message: "Amount not found"
            });
        }
        return res.status(200).json({
            status: "success",
            data: amount
        });
    }
    catch(error){
        return res.status(500).json({
                status: "error",
                message: "Amount not updated",
        });
    }
}

exports.deleteAmount = async(req, res, next) => {
    try{
        const amount = await Amount.deleteOne({_id: req.params.id});
        // update user amount 
        const userUpdate = await User.updateOne({_id: req.body.user}, {$pull: {monthly_fees: req.params.id}});

        if(!userUpdate.acknowledged){
            return res.status(400).json({
                status: "error",
                message: "Amount not found"
            });
        }
        return res.status(200).json({
            status: "success",
            data: amount
        });
    }
    catch(error){
        return res.status(500).json({
                status: "error",
                message: "Amount not deleted",
        });
    }
}


// get user amounts 
exports.getUserAmount = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const amount = await Amount.find({user: req.params.id});

        if(user.role == "Student"){
            // create array with all months fee and outstanding fees 
            const monthly_fees = [];
            amount.forEach((amount) => {
                if(amount.type == "Monthly Fees"){
                    monthly_fees.push({
                        month: amount.month,
                        year: amount.year,
                        amount: amount.amount,
                        date: amount.date,
                        expected: amount.expected_amount,
                        paid: amount.isPaid
                });
            }
            });

            // calculate outstanding fees
             const outstanding = monthly_fees.reduce((acc, curr) => {
                     return acc + (curr.expected - curr.amount);
                 } , 0);
            
            // find admission fees 
            admission_fees = amount.find((amount) => amount.type == "Admission Fees").amount || 0; 
            return res.status(200).json({
                status: "success",
                data: {
                    monthly_fees,
                    outstanding: outstanding,
                    admission_fees
                }
            });
        }


        if(user.role == "Teacher" || user.role == "Staff"){
            // create array with all months fee and outstanding fees
            const salary= [];
            amount.forEach((amount) => {
                if(amount.type == "Salary"){
                    salary.push({
                        month: amount.month,
                        year: amount.year,
                        amount: amount.amount,
                        date: amount.date,
                        expected: amount.expected_amount,
                        paid: amount.isPaid
                });
            }
        });
        // calculate outstanding fees
        const outstanding = salary.reduce((acc, curr) => {
            return acc + (curr.expected - curr.amount);
        } , 0);

        return res.status(200).json({
                status: "success",
                data:{
                    salary,
                    outstanding: outstanding
                } 

            });
        }

        return res.status(200).json({
            status: "success",
            message: "your are admin"
        });

    } catch (error) {
        return res.status(404).json({
            status: "error",
            message: "No user found",
            error: error.message
        });
    }
}
