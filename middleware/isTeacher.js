const User = require('../models/user');

module.exports = async(req, res, next) => {
    const user_id= req.cookies && req.cookies.user_id

    const user = await User.findOne({ _id: user_id});

    if (user && (user.role == "Teacher")) {
        return next();
    }
    return res.status(404).json({
        status: "error",
        message: "You Are not authorised to access this"
    });
}