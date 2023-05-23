const User = require('../models/user')

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