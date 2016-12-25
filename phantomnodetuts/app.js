var http = require('http');
var path = require('path');
var port = process.env.port|| '3000';
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// if localhost, pretty-print html output
app.locals.pretty = process.env.port?false:true;
app.set('port',port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//static directory
app.use(express.static(__dirname+'/public'));
app.use('/',require('./router'));

http.createServer(app).listen(port);
