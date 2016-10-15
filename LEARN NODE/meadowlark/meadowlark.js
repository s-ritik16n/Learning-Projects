const express = require('express');

const app = express();

//setup handlebar view engine
var handlebars = require('express3-handlebars')
.create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3000);
/*
app.get('/',function(req,res){
    res.type('text/plain');
    res.send('MEADOWLARK TRAVELS');
});

app.get('/about',function(req,res){
    res.type('text/plain');
    res.send('about page');
});

//custom 404 page
app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.end('page not found');
});

//custom 500 page
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.end('Internal server error');
});
*/


//after setting up handdlebars

app.get('/',function(req,res){
    res.render('home');
});
app.get('/about',function(req,res){
    res.render('about');
});
app.get('/headers', function(req,res){
res.set('Content-Type','text/plain');
var s = '';
for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
res.send(s);
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});
app.use(function(err,req,res,next){
    res.status(500);
    res.render('500');
})
app.listen(app.get('port'),function(){
    console.log('server listening at http://localhost:'+app.get('port')+' ...');
});