const mongoose = require('mongoose');

// blueprint that will be used to create data
const postSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
})

module.exports = mongoose.model('UserData',postSchema);