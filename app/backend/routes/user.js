const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const checkAuth = require("../middleware/check-auth");
const CryptoJS = require("../controllers/encryption")

const router = express.Router();
const jsonParser = express.json();

const SECRET_KEY = 'long_secret_key_that_should_be_used_for_authentication';

/**
 *  available route for api/user
 *  api/user/signup         - For user to signup
 *  api/user/login          - For user to login 
 *  api/user/get/report     - For superaccount to get user report based on last login (authentication token need to be included)
 *  api/user/update/forgot  - For user to update password when they forgot their password via PIN
 *  api/user/update/info    - For user to update their username and contact (authentication token need to be included)
 *  api/user/update/pwd     - For user to update their password (authentication token need to be included)
 */

// function to check password is equal
async function checkuser (password1,password2) {
    const match = await bcrypt.compare(password1, password2).catch(error => {
        return false
    });
    return match;
} 

// Signup route for user
router.post("/signup",jsonParser, (req,res,next) => {
    let hashpwd = null;
    let hashpin = null;
    bcrypt.hash(req.body.password, 10).then(hash => {
        hashpwd = hash;
    }); 
    bcrypt.hash(req.body.PIN, 10).then(hash => {
        hashpin = hash;
    }); 
    const user = new User({
        useremail: CryptoJS.encrypt(req.body.useremail),
        username: CryptoJS.encrypt(req.body.username),
        contact: CryptoJS.encrypt(req.body.contact),
        password: hashpwd,
        login_count: 0,
        last_login: new Date(0),
        PIN: hashpin
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

// Login route for user
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
            const token = jwt.sign({useremail: fetchedUser.useremail, userId: fetchedUser._id, class: fetchedUser.class}, SECRET_KEY, { expiresIn: '1h'}); // secret key for encryption
            
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

// Return report for superaccount 
router.get("/get/report", checkAuth, (req,res,next) => {
    const token = req.headers.authorization.split(" ")[1];   // try to check if user action was authorised
    const verifiedJwt = jwt.verify(token, SECRET_KEY);
    if (verifiedJwt.body.class == "superaccount"){
        // If authentication of user success
        User.find().sort({last_login: -1})
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
            console.log(error);
            res.status(500).json({
                message: 'Unknown Error While Retrieving User Data'
            });
        })
    }
    else {
        res.status(401).json({
            message: "Unauthorised access to this feature!"
        })
    };
});

// Temporary route to display database 
// TODO: remove route after testing
router.get("/get",(req,res,next) => {
    User.find().sort({last_login: -1})
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
});
router.get("/get/raw",(req,res,next) => {
    User.find().sort({last_login: -1})
        .then(userinfo => {
            res.status(201).json({
                message: 'Post fetched successfully!',
                posts: userinfo        // transform of data at guide 54
            });
        }) 
        .catch(error => {
            console.log(error)
        })
});
 
// Forgot password reset request
router.put("/update/forgot", jsonParser, (req,res,next) => {
    /**
     * req.body element needed 
     * - useremail
     * - password
     * - PIN
     */
    let requestUseremail = CryptoJS.encrypt(req.body.useremail);
    User.findOne({ useremail: requestUseremail })
    .then(user => {
        if(!user){
            return false;
        }
        else{
            return checkuser(req.body.PIN, user.PIN);
        }
    })
    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: "Incorrect PIN"
            })
        }
        else{
            let hashpwd = null;
            // hash replaced password
            bcrypt.hash(req.body.password, 10).then(hash => {
                hashpwd = hash;
            }); 
            // update password for user
            User.updateOne({ useremail: CryptoJS.encrypt(req.body.useremail) },{ $set: { password: hashpwd }})
            .then(output => {
                return res.status(200).json({
                    message: "Password reset completed"
                });
            })
            .catch(error => {
                return res.status(401).json({
                    message: `Failed to update password for ${req.body.useremail}`
                });
            })
        }
    }).catch(error => {
        return res.status(401).json({
            message: "Authentication failed (useremail doesn't exist)"
        });
    });
});

// Update personal info
router.put("/update/info", checkAuth, jsonParser, (req,res,next) => {
    /**
     * req.body element needed 
     * - useremail
     * - username
     * - contact
     * 
     * useremail are not allowed to change
     */
    User.updateOne({ useremail: CryptoJS.encrypt(req.body.useremail) },{ $set: { username: req.body.username, contact: req.body.contact }})
        .then(output => {
            return res.status(200).json({
                message: "Personal information updated"
            });
        })
        .catch(error => {
            return res.status(401).json({
                message: `Failed to update personal information for ${req.body.useremail}`
            });
        })
});

// Update personal password
router.put("/update/pwd", checkAuth, jsonParser, (req,res,next) => {
    /**
     * req.body element needed 
     * - useremail
     * - newpassword
     * - oldpassword
     */
    // old password and new password should be sent here and authenticate using the User.findOne
    let requestUseremail = CryptoJS.encrypt(req.body.useremail);
    User.findOne({ useremail: requestUseremail })
    .then(user => {
        if(!user){
            return false;
        }
        else{
            return checkuser(req.body.oldpassword, user.password);
        }
    })
    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: "Incorrect password"
            })
        }
        else{
            let hashpwd = null;
            // hash newpassword
            bcrypt.hash(req.body.newpassword, 10).then(hash => {
                hashpwd = hash;
            }); 
            // update password for user
            User.updateOne({ useremail: CryptoJS.encrypt(req.body.useremail) },{ $set: { password: hashpwd }})
            .then(output => {
                return res.status(200).json({
                    message: "New password updated"
                });
            })
            .catch(error => {
                return res.status(401).json({
                    message: `Failed to update password for ${req.body.useremail}`
                });
            })
        }
    }).catch(error => {
        return res.status(401).json({
            message: "Authentication failed (useremail doesn't exist)"
        });
    });
});

module.exports = router;