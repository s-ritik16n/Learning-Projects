var express = require('express');
var http = require('http');
var morgan = require('morgan');
var hostname = 'localhost';
var port = 3000;

var app = express();
app.use(morgan('dev'));

app.use(express.static(__dirname+'/public'));

app.all('/dishes',function(req,res,next){
    res.writeHead(200,{ContentType:'text/html'});
    next();
});

app.get('/dishes',function(req,res,next){
    res.end('get dishes');
});
app.post('/dishes',function(req,res,next){
    res.end('will add the dish '+req.body.name+' and description '+req.body.description);
});
app.delete('/dishes',function(req,res,next){
    res.end('deleting all dishes');
});
app.get('/dishes/:dishId',function(req,res,next){
    res.end('get dish '+req.params.dishId);
});
app.put('/dishes/:dishId',function(req,res,next){
    res.end('Updating the dish '+req.params.dishId+'\nWill update the dish: '+req.body.name+' with description '+req.body.description);
});
app.delete('/dishes/:dishId',function(req,res,next){
    res.end('Deleting dish: '+req.params.dishId);
});

app.listen(port,hostname,function(){
    console.log('server running at http://${hostname}/${port}/');
});