var express = require('express');
var http = require('http');
var hostname = 'localhost';
var port = 3000;

var app = express();
app.use(function(req,res,next){
    res.writeHead(200,{ContentType:'text/html'});
    res.end("<html><body>Hi</body></html>");
});
var server = http.createServer(app);
server.listen(port,hostname,function(){
    console.log('server running at http://${portname}/${port}/');
})