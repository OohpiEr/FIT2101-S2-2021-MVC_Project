const express = require('express');
const mongoose = require('mongoose');

const Post = require('./models/post');
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
        "Origin, X-Requested-With, Content-Type, Accept"
        );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, PUT, OPTIONS"
        );
    next();
});

// This is where the post request data will post to and listened by here
app.post('/api/posts',(req,res,next)=>{
    const post = new Post({
        username: req.body.title,
        password: req.body.content
    });
    post.save();
    res.status(201).json({
        message: 'Post added successfully!'
    });
});

// '/api/post' is a filter for example, localhost:3000/posts, will get here
app.get('/api/posts',(req,res,next)=>{
    Post.find()
        .then(documents => {
            res.status(201).json({
                message: 'Post fetched successfully!',
                posts: documents        // transform of data at guide 54
            });
        });
    const post = new Post({
        username: 'Desmond', 
        password: "Testing"
    });
    post.save();
    console.log("success")
});

// :id is dynamic, need to perform HTTP request for delete
app.delete("/api/posts/:id",(req,res,next)=>{
    Post.deleteOne({_id : req.params.id})
    .then(result => {
        console.log(result);
    })
    console.log(req.params.id);
    res.status(200).json({message:"Delete successfully"})
})

// exported for server.js
module.exports = app;