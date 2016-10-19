var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model("Post");

function isAuthenticated(req,res,next){
  if(req.method === "GET"){
    return next();
  }

  if(!req.isAuthenticated())
  return next();

  return res.redirect("/#login");

};
router.use('/posts',isAuthenticated);

router.route('/posts')
  .get(function(req,res){
    Post.find(function(err,posts){
      if(err){
        return res.send(500,err);
      }
      return res.send(200,posts);
    });
  })
  .post(function(req,res){
      var post = new Post();
      post.text =  req.body.text;
      post.username = req.body.created_by;
      post.save(function(err,post){
        if(err){
          return res.send(500,err);
        }
        return res.json(post);
      })
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
