// Make it export ready
exports.middleware = ( req , res , next ) => {
    // res.locals is an objet that contains information associated with this response.
    res.locals.message = "Hooray?!"
    
    // If we don't do this, the request will hang!
    next();
}