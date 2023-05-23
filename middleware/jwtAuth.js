const maxAge = 60 * 60 * 12;
const jwt = require("jsonwebtoken");

exports.signToken = (req, res, next) => {
    user_id = req.body.user_id;
    
    console.log(process.env.secret);
    const token = jwt.sign({ user_id }, process.env.secret, {
        expiresIn: maxAge, //this is in seconds
    });

    res.cookie("token", token, { maxAge: maxAge * 1000 });
    res.cookie("user_id", user_id , { maxAge: maxAge * 1000 })

    return next();
}

exports.check = (req, res, next) => {
    try {
        const cToken = req.cookies.token;
        jwt.verify(cToken, process.env.secret, (err, dToken) => {
            if (err) {
                res.status(404).json({ status: "error", message: "you are not logged in" })

            } else {
                return next();
            }
        });
    } catch (err) {
        const cToken = req.cookies.token;
        res.status(400).json({ status: "error", message: "You are not logged in" })

    }
}