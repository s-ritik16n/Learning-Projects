var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app=express();

var User = require('./models.js').User;
var Question = require('./models.js').Question;
var Answer = require('./models.js').Answer;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  resave:true,
  secret: 'cookieSecret',
  saveUninitialized:true,
  cookie:{secret:false},
  maxAge:24*60*60*1000
}));
app.use(express.static(__dirname+'/public'));

app.listen('3000');
console.log("Magic happens at port 3000");
