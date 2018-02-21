const http = require('http');
const express = require('express');
const hostname = 'localhost';
const port = 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(morgan('dev'));

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all(function(req,res,next){
    res.writeHead(200,{ContentType: 'text/html'});
    next();
})
.get(function(req,res,next){
    fileUrl = '/index.html'
    const filePath = path.resolve('./public/main'+fileUrl);
    fs.createReadStream(filePath).pipe(res);
});

dishRouter.route('/dishes')
.all(function(req,res,next){
    res.writeHead(200,{ContentType: 'text/html'});
    next();
})
.get(function(req,res,next){
    res.end('<html><body>dishes</body></html>');
});

app.use('/',dishRouter);

app.use(express.static(__dirname+'/public'));

app.listen(port,hostname,function(){
    console.log('server running');
});