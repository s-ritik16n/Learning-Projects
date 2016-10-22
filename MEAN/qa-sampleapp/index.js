var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.user(bodyParser.json());
app.use(bodyParser.urlencoded({enabled:true}));
