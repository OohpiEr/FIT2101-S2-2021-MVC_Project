const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorisation.split(" ")[1];   // try to check if user action was authorised
        jwt.verify(token, 'long_secret_key_that_should_be_used_for_authentication');
        next();
    } catch (error) {
        res.status(401).json({
            message: "Auth failed!"
        });
    }
};