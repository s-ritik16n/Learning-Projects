var express = require('express');
var router = express.Router();


function isAuthenticated(req,res,next){
  if(req.method == = "GET")
   return next();

  if(!req.isAuthenticated())
  return next();

  return res.redirect("/#login");

};
router.use('/posts',isAuthenticated);

router.route('/posts')
  .get(function(req,res){
    res.send({message: "return all posts"});
  })
  .post(function(req,res){
    res.send({message: "create a new post"});
  });

router.route("/posts/:id")
  .get(function(req,res){
    res.send({message: "return posts with ID "+ req.params.id});
  })
  .put(function(req,res){
    res.send({message: "modify with ID "+ req.params.id});
  })
  .delete(function(req,res){
    res.send({message: "delete posts with ID "+ req.params.id});
  });


module.exports = router;
