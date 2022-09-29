const User = require("../models/user");
const bycrypt = require("bcrypt");

// GET route for registration
exports.getRegister = (req, res, next) => {

    return res.status(200).json({
        status: "success",
        message: "this is get request to user"
    });

};

//POST route for updating data
exports.postRegister = async(req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = await bycrypt.hash(req.body.password, 10);
    const role = req.body.role || "Patient";

    if (role !== "Patient" && role !== "Doctor" && role !== "Admin") {
        return res.status(400).json({
            status: "error",
            message: "role should be Doctor or Patient or Admin"
        });
    };

    var userData = {
        email,
        name,
        password,
        role,
        loginAttempts: 1,
        lockUntil: 1,
    };

    User.create(userData, function(error, user) {
        if (error) {
            return res.status(500).send({
                status: "error",
                message: error.message
            });
        } else {
            return res.status(200).json({
                status: "success",
                message: "User created successfully",
                user
            });
        }
    });
}

// GET login
exports.getLogin = (req, res, next) => {

    return res.status(200).json({
        status: "success",
        message: "this is get request to user login"
    });
};

// POST login
exports.postLogin = async(req, res, next) => {
    const email = req.body.email,
        password = req.body.password;

    const user = await User.findOne({ email: email });
    console.log(user, req.body);
    bycrypt.compare(password, user.password, function(err, result) {
        if (result) {
            return res.status(200).json({
                status: "success",
                message: "User logged in successfully",
            });
        } else {
            return res.status(400).json({
                status: "error",
                message: "Invalid email or password",
            });
        }
    });


};

// GET for logout
exports.getLogout = (req, res, next) => {
    // delete session object
    res.cookie("token", "expire", { maxAge: 10 });
    res.cookie("email", "email", { maxAge: 10 });
    return res.status(200).json({
        status: "success",
        message: "User logged out successfully",
    });
};