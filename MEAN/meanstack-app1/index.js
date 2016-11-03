var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app=express();

var User = require('./user.js');
var Question = require('./question.js');
var Answer = require('./answer.js');

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

app.route('/signup').
get(function(req,res){
  res.sendFile(__dirname+'/public/index.html')
}).
post(function(req,res){
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.name = req.body.name;
  user.about_me = req.body.me;
  user.save(function(err,user){
    if(err)res.json({
      exists:true
    })
    console.log(user);
    user.exists =false
    res.json(user)
  })
});

app.route('/home').
get(function(req,res){
  res.sendFile(__dirname+'/public/index.html')
});

app.listen('3000');
console.log("Magic happens at port 3000");
