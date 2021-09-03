const express = require('express');

const app = express();

// Guide 38 - To Be Removed
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
});

// '/api/post' is a filter for example, localhost:3000/posts, will get here
app.use('/api/posts',(req,res,next)=>{
    const posts = [
        {
            id: 'asdasffa', 
            title: "First server side post", 
            content: "This is coming from server"
        },
        {
            id: 'jkfbgjks', 
            title: "Second server side post", 
            content: "This is coming from server"
        },
    ]
    res.status(200).json({
        message: 'Post fetched successfully!',
        posts: posts
    });
});

// exported for server.js
module.exports = app;