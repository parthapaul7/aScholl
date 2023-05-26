const User = require('../models/user')
const Amount=  require('../models/amounts');
const { get } = require('lodash');

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
        const userUpdate = await User.updateOne({_id: req.body.user}, {$push: {amount: amount._id}});

        if(!userUpdate.acknowledged || !amount.acknowledged){
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
        return res.status(500).json({
                status: "error",
                message: "Amount not added",
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
        const userUpdate = await User.updateOne({_id: req.body.user}, {$pull: {amount: req.params.id}});

        if(!amount.acknowledged || !userUpdate.acknowledged){
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
