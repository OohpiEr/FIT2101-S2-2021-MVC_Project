const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req,res,next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            useremail: req.body.email,
            username: req.body.username,
            contact: req.body.contact,
            password: hash
        });
        user.save().then(result =>{
            res.status(201).json({
                message: "User created",
                result: result
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
    });  
});

router.post("/login", (req,res,next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email }).then(user => {
        if(!user){
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if (!result) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'long_secret_key_that_should_be_used_for_authentication', {expiresIn: '1h'}); // secret key for encryption
        res.status(200).json({
            token: token
        });
    }).catch(error => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });;
});



module.exports = router;