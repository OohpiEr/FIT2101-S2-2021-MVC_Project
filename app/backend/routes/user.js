const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const User = require("../models/user");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const jsonParser = bodyParser.json();

router.post("/signup",jsonParser, (req,res,next) => {
    let user;
    bcrypt.hash(req.body.password, 10).then(hash => {
        user = new User({
            useremail: req.body.useremail,
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

router.get("/signup", (req,res,next) => {
    res.status(200).json({
        message: "GET success!"
    })
    next();
});

async function checkuser (password1,password2) {
    const match = await bcrypt.compare(password1, password2);
    console.log(password1,password2,match);
    return match;
}

router.post("/login",jsonParser, (req,res,next) => {
    let fetchedUser;
    User.findOne({ useremail: req.body.useremail })
    .then(user => {
        if(!user){
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        fetchedUser = user;
        return checkuser(req.body.password, user.password);
    })
    .then(result => { 
        if (!result) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        const token = jwt.sign({useremail: fetchedUser.useremail, userId: fetchedUser._id}, 'long_secret_key_that_should_be_used_for_authentication', {expiresIn: '1h'}); // secret key for encryption
        res.status(200).json({
            token: token,
            useremail: fetchedUser.useremail,
            username: fetchedUser.username,
            contact: fetchedUser.contact
        });
    })
    .catch(error => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });;
});

// Testing request to mongodb database
router.get("/jii",(req,res,next) => {
    User.find()
        .then(userinfo => {
            res.status(201).json({
                message: 'Post fetched successfully!',
                posts: userinfo        // transform of data at guide 54
            });
        });
    code = Math.floor(Math.random() * (100 - 0) + 0);
    email = 'testing' + code + '@gmail.com';
    const user = new User({
        username: 'Android'+code, 
        useremail: email,
        contact: ''+Math.floor(Math.random() * (99999999 - 10000000) + 10000000),
        password: "" + Math.random()
    });
    //user.save().catch(error => {
    //    console.log("Email already exists!!!!!!")
    //});
})

// To be developed for updating 
router.put("/update",checkAuth,(req,res,next) => {
    // old password and new password should be sent here and authenticate using the User.findOne
    const user = new User({
        useremail: req.body.email,
        username: req.body.username,
        contact: req.body.contact,
    })
});

module.exports = router;