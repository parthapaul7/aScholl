exports.getNotFound = (req, res, next) => {

    return res.status(404).json({
        status: "error",
        message: "Page Not Found",
    });
}