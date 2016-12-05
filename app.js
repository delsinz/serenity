// set up ======================================================================
// get all the tools we need
var neo4j = require ('neo4j');
var express = require('express');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var static = express.static
//var flash = require('connect-flash');

// configuration ===============================================================
var app = express();
//connect to our database
var db = new neo4j.GraphDatabase("http://neo4j:INFO30005@104.236.121.170:7474"); 

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // get information from html forms


app.set('view engine', 'ejs'); // set up ejs for templating
//app.use (flash()); // connect flash to flash up errors and messages.

// routes ======================================================================
require('./router/router')(app, static, passport, db);



// launch ======================================================================
app.listen(3000);
console.log('application started on port 3000')
