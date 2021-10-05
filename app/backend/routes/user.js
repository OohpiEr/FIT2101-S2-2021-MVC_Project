const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const User = require("../models/user");
const checkAuth = require("../middleware/check-auth");
const CryptoJS = require("../controllers/encryption")

const router = express.Router();

const jsonParser = bodyParser.json();

const SECRET_KEY = 'long_secret_key_that_should_be_used_for_authentication';

router.post("/signup",jsonParser, (req,res,next) => {
    let user;
    bcrypt.hash(req.body.password, 10).then(hash => {
        user = new User({
            useremail: CryptoJS.encrypt(req.body.useremail),
            username: CryptoJS.encrypt(req.body.username),
            contact: CryptoJS.encrypt(req.body.contact),
            password: hash,
            login_count: 0,  
            last_login: new Date(0),
            PIN: "011234"
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

async function checkuser (password1,password2) {
    const match = await bcrypt.compare(password1, password2).catch(error => {
        return false
    });
    return match;
}

router.post("/login", jsonParser, (req,res,next) => {
    let fetchedUser;
    let requestUseremail = CryptoJS.encrypt(req.body.useremail);
    User.findOne({ useremail: requestUseremail })
    .then(user => {
        if(!user){
            return false;
        }
        else{
            fetchedUser = user;
            return checkuser(req.body.password, user.password);
        }
    })
    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: "Authentication failed"
            })
        }
        else{
            // TODO: update the useremail
            const token = jwt.sign({useremail: fetchedUser.useremail, userId: fetchedUser._id, class: fetchedUser.class}, SECRET_KEY, {expiresIn: '1h'}); // secret key for encryption
            
            // update login count
            const UpdateUser = new User({
                login_count: fetchedUser.login_count + 1,
                last_login: Date.now()
            });

            User.updateOne({ useremail: CryptoJS.encrypt(req.body.useremail) },{ $set: { login_count: UpdateUser.login_count, last_login: UpdateUser.last_login}}).then(output => {
                return res.status(200).json({
                    token: token,
                    useremail:  CryptoJS.decrypt(fetchedUser.useremail),
                    username:   CryptoJS.decrypt(fetchedUser.username),
                    contact:    CryptoJS.decrypt(fetchedUser.contact)
                });
            })
            .catch(error => {
                return res.status(401).json({
                    message: "Update login history failed"
                });
            })
        }
    }).catch(error => {
        console.log("error")
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
});

// Testing request to mongodb database
router.get("/jii",(req,res,next) => {
    User.find()
        .then(userinfo => {
            for (let i = 0;i<userinfo.length;i++) {
                userinfo[i].useremail = CryptoJS.decrypt(userinfo[i].useremail)
                userinfo[i].username =  CryptoJS.decrypt(userinfo[i].username)
                userinfo[i].contact =   CryptoJS.decrypt(userinfo[i].contact)
            };
            res.status(201).json({
                message: 'Post fetched successfully!',
                posts: userinfo        // transform of data at guide 54
            });
        })
        .catch(error => {
            console.log(error)
        })
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