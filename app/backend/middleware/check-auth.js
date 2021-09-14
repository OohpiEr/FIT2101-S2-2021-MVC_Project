const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorisation.split(" ")[1];   // try to check if user action was authorised
    } catch (error) {
        res.status(401).json({
            message: "Auth failed!"
        });
    }
};