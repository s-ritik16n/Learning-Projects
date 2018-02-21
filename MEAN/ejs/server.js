var express = require('express');
var app = express();
var port = 8000;
var ejs = require('ejs')
//set the view engine to ejs
app.set('view engine','ejs');

//use res.render to load up an ejs view file

//index page
app.get('/',(req,res)=>{
  var drinks = [
    {name: 'Blood Mary', drunkness: 5},
    {name : 'Martini', drunkness: 3},
    {name: 'Scotch', drunkness: 10}
  ];
  var tagline = "Learn, Implement, Deploy!"
  res.render('pages/index',{
    drinks: drinks,
    tagline: tagline
  });
});

app.get('/about',(req,res)=>{
  res.render('pages/about')
})

ejs.filters.last = function(obj){
  return  obj[obj.length - 1]
}
app.listen(port);
console.log("All eyes at "+port);
