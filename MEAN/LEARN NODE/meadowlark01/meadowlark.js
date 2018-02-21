const express = require('express');
const fortune = require('./lib/fortune.js');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const app = express();
const crendentials = require('./credentials.js');
const mailTransport = require('./mail');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(require('cookie-parser')(crendentials.cookireSecret));

app.use(express.static(__dirname+'/public'));

//setup handlebar view engine
var handlebars = require('express3-handlebars')
.create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3000);


//after setting up handlebars



app.get('/',function(req,res){
    res.render('home');
});
app.get('/about',function(req,res){
    res.render('about',{fortunes:fortune.getFortune()});
});

app.get('/newsletter',function(req,res){
    res.render('newsletter',{csrf:'CSRF goes here'});
});

app.post('/process',function(req,res){
    console.log('Form (from querystring): ' + req.query.form);
    console.log('CSRF from hidden form field:'+req.body._csrf);
    console.log('name from visible field:'+req.body.name);
    console.log('EMail from visible field'+req.body.email);
    res.redirect(303,'/thank-you');
})

app.get('/contest/vacation-photo',function(req,res){
    var now = new Date();
    res.render('contest/vacation-photo',{
        year:now.getFullYear(),month:now.getMonth()
    });
});

app.post('/contest/vacation-photo/:year/:month',function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        if(err) return res.redirect(303,'/error');
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.redirect(303,'/thank-you');
    });
});


app.use(function(req,res){
    res.status(404);
    res.render('404');
});
app.use(function(err,req,res,next){
    res.status(500);
    res.render('500');
});
app.listen(app.get('port'),function(){
    console.log('server listening at http://localhost:'+app.get('port')+' ...');
});

mailTransport.sendMail({
    from:'Meadowlark <info@meadowlark.com>',
    to: 'saxenar444@gmail.com',
    subject: 'Your meadowlark travel',
    text: 'sample mail',
},function(err){
    if(err) console.error( 'Unable to send email: ' + error );
});

/*
setting cookies-
res.cookie('monster', 'nom nom');
res.cookie('signed_monster', 'nom nom', { signed: true });
*/

/*
accessing cookies-
var monster = req.cookies.monster;
var signedMonster = req.signedCookies.monster;
*/

/*
To delete a cookie, use req.clearCookie:
res.clearCookie('monster');
*/