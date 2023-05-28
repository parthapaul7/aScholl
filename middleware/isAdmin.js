const User = require('../models/user');

module.exports = async(req, res, next) => {
    const phone= req.cookies && req.cookies.phone

    const user = (await User.find({ phone:  phone}))[0];

    if (user && (user.role == "Admin")) {
        return next();
    }
    return res.status(404).json({
        status: "error",
        message: "You Are not authorised to access this"
    });
}