const User = require('../models/user');

module.exports = async(req, res, next) => {
    email = req.cookies && req.cookies.email

    const user = (await User.find({ email: email }))[0];

    if (user && (user.role == "Doctor")) {
        return next();
    }
    return res.status(404).json({
        status: "error",
        message: "You Are not authorised to access this"
    });
}