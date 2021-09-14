const express = require("express");
const bcrypt = require('bcrypt');

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req,res,next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            useremail: req.body.email,
            username: req.body.username,
            password: hash
        });
        user.save().then(result =>{
            res.status(201).json({
                message: "User created",
                result: result
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
    });  
});

router.post("/login", (req,res,next) => {
    User.find({ email: req.body.email }).then(user => {
        if(!user){
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        return bcrypt.compare(req.body.password, user.password);
    });
});

module.exports = router;