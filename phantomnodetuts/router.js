var express = require('express');
var path = require('path');
var url = require('url');
var router = express.Router();
var md5 = require('md5');
var exec = require('child_process').exec;
/* GET home page. */

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/snap',function(req,res,next){
  width = req.query.width;
  website = req.query.url;
  var hash = md5(website);
  var savePath = path.join(__dirname,'public','screenshots',hash)+'.png';
  var cmd = [pathToPhantom(), 'generator.js', website, savePath, width, 1080].join(' ');

  exec(cmd,function(err){
    if (err) {
      console.log(err);
      return;
    }
    return res.json({ path: '/screenshots/'+ hash +'.png' });
  })
})

function pathToPhantom(){
  var phantom = (/^win/.test(process.platform))?'phantomjs.exe':'phantomjs';
  return path.join('/usr','bin',phantom);
}

module.exports = router;
