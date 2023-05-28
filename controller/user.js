const User = require('../models/user')

exports.postLogin = async(req, res, next) => {
    const user_id = req.cookies && req.cookies.phone;

    console.log(user_id);
    return res.status(200).json({
        status: "success",
        message: "this is get request to user login"
    });
}


exports.getUser= async(req, res, next) => {

    try {
        const user = await User.find({...req.query});

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
            error: error.message
        }); 
    }
}

exports.getOneUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('monthly_fees', 'absent');
        if (!user) {
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
            error: error.message
        });
    }
}

exports.postUser = async(req, res, next) => {
      try{
        const user = await User.create(req.body);            
        
        return res.status(200).json({
            status: "success",
            data: user
        });
    }catch(error){
        // create error text
        return res.status(200).json({
                status: "error",
                message: "User not create",
                error : error.message 
        });
    }
}

exports.getLogout = (req, res, next) => {
    // delete session object
    res.cookie("token", "expire", { maxAge: 10 });
    res.cookie("user_id", "expire", { maxAge: 10 });
    return res.status(200).json({
        status: "success",
        message: "User logged out successfully",
    });
};