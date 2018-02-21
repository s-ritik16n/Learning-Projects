var mongoose = require('mongoose');
var express = require('express');
var app = express();
mongoose.connect("mongodb://localhost:27017/mydb");

var db=mongoose.connection;
db.on("error",console.error.bind(console,"db connection error"));
db.once('open',function(){
  
})

app.listen('3000');
console.log("Server listens on 3000");
