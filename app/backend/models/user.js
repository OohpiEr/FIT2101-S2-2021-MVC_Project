const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// blueprint that will be used to create data
const userSchema = mongoose.Schema({
    useremail: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    contact: { type: String, required: true},
    password: { type: String, required: true },
    login_count: { type: Number, required: true},
    last_login: { type: Date, required: true},
    PIN: { type: String, required: true},
    class: { type: String, default: "basic"}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User",userSchema);