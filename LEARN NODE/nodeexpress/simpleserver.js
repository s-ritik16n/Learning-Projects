const http = require('http');

http.createServer(function(req,res){
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLocaleLowerCase();
    
    switch(path){
        case '':
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end('Homepage');
            break;
        case '/about':
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end('about');
            break;
        default:
            res.writeHead(404,{'Content-Type':'text/plain'});
            res.end('Not found');
            break;
    }
}).listen(3000);
console.log('server listening at localhost:3000 ...');