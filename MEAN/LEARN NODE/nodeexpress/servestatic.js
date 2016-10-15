const fs = require('fs');
const http = require('http');

function serveStatic(res,path,contentType,responseCode){
    if(!responseCode)responseCode = 200;
    fs.readFile(__dirname+path,function(err,data){
        if(err){
            res.writeHead(500,{'Content-Type':'text/plain'});
            res.end('internal server error');
        }else{
            res.writeHead(responseCode,{'Content-Type':contentType});
            res.end(data);
        }
    });
}

http.createServer(function(req,res){
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLocaleLowerCase();
    switch(path){
        case '':
            serveStatic(res,'/public/hero-unit.jpg','image/jpeg');
            break;
        case '/about':
            serveStatic(res,'/public/hero-unit3.jpg','image/jpeg');
            break;
        default:
            serveStatic(res,'/public/404.html','text/html',404);
            break;
    }
}).listen(3000);

console.log('server running at localhost:3000 ...');