const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const app = express();

mongoose.connect("mongodb+srv://Administrator:yc8tiYg6KffJembQ@fit2101project.0m0cx.mongodb.net/userData?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to mongodb cloud server");
})
.catch(()=>{
    console.log("Connection failed");
});

// Guide 38 - To Be Removed
app.use((req,res,next)=>{
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
        );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, PUT, OPTIONS"
        );
    next();
});

// routes with user will be directed to the routes/user.js
app.use('/api/user',userRoutes);

// exported for server.js
module.exports = app;