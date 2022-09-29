const maxAge = 60 * 60 * 12;
const jwt = require("jsonwebtoken");

exports.signToken = (req, res, next) => {
    email = req.body.email;

    const token = jwt.sign({ email }, process.env.secret, {
        expiresIn: maxAge, //this is in seconds
    });

    res.cookie("token", token, { maxAge: maxAge * 1000 });
    res.cookie("email", email, { maxAge: maxAge * 1000 })

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