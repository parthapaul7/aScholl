const User = require("../models/user");

exports.getAdmin = (req, res, next) => {

    return res.status(200).json({
        status: "success",
        messege: "Welcome Admin"
    });

};

exports.getDoctor = (req, res, next) => {

    return res.status(200).json({
        status: "success",
        messege: "Welcome Doctor"
    });

};

exports.getPatient = (req, res, next) => {

    if (req.cookies && req.cookies.token && req.cookies.email) {
        return res.status(200).json({
            status: "success",
            messege: "Welcome Hospito"
        });
    }
    return res.status(200).json({
        status: "success",
        messege: "Welcome Patient"
    });

};

exports.getSearch = async(req, res, next) => {
    try {
        const user = await User.find({...req.query })

        if (user.length == 0) {
            return res.status(200).json({
                message: "No user found"
            });
        }

        return res.status(200).json({
            status: "success",
            data: user
        });

    } catch (error) {
        return res.status(404).json({
            status: "error",
            message: "No user found",
            error: error
        });
    }

};