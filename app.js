// Express uses Middleware to add functionality to our application that might not be present in Express itself

const express = require('express');
const app = express();

// Destructure and get only 'middleware'
let {middleware} = require(__dirname + "/middleware.js");

app.get('/a',middleware, (req,res,next)=>{
    // res.send("ROUTE a " + (res.locals.message || "No Message Found!"));
    // next("route");
    
    let error = new Error("Oh NO! Something is NOT right.");
    
    // When we pass an 'error' to next, Express will skip all remaining middleware and go directly to the first error handler middleware.
    next(error);
});

// Now use the middleware... for crying out loud
// app.use(middleware);

app.get('/b', (req,res)=>{
    res.send("ROUTE b " + (res.locals.message || "No Message Found!"));
});

app.get('/:c', (req,res)=>{
    res.send("ROUTE c " + req.params.c + (res.locals.message || " No Message Found!"));
});

// Error Handler Middleware. **Express considers any middleware with four parameters to be an error handler.
let errorHandler = (error, req, res, next) => {
    
    // next() is not neccessary if res.send() is called!
    res.send("There's been an error! " + error.message);
    
}

// Use the error middleware!
app.use(errorHandler);

const server = app.listen(8080, ()=>{console.log('listneing')});