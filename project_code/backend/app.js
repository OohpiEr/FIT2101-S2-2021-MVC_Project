const express = require('express');

const app = express();

app.use((req,res,next)=>{
    console.log("First middleware")
    next();     // jump to next app.use()
});

app.use((req,res,next)=>{
    res.send("Hello form express")
});

// exported for server.js
module.exports = app;