const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// blueprint that will be used to create data
const userSchema = mongoose.Schema({
    useremail: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User",userSchema);