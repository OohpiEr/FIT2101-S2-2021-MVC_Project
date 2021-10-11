const jwt = require('jsonwebtoken');

const SECRET_KEY = 'long_secret_key_that_should_be_used_for_authentication';

module.exports = (req,res,next) => {
    try {
        console.log(req.headers);
        const token = req.headers.Authorization.split(" ")[1];   // try to check if user action was authorised
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        res.status(401).json({
            message: "UNAUTHORISED ACCESS"
        });
    }
};