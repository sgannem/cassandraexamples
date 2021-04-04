var express = require('Express');
var app = express();

var things = require('./things.js');

app.use('/things', function(req, res, next){
    console.log("A request for things received at " + Date.now());
    next();
 });

//both index.js and things.js should be in same directory
app.use('/things', things);
//Middleware function to log request protocol


app.listen(3000);