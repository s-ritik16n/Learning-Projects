var mongoose = require('mongoose');
var book = require('../models/book');

var getBooks = function(req,res){

  let query = book.find({});
  query.exec(function(error,books){
    if(error) res.send(error);
    res.json(books);
  })
}

var postbook = function(req,res){

  var newBook = new book(req.body);
  newBook.save(function(err,book){
    if(err){
      res.send(err);
    }
    else {
      res.json({message: "Successful insertion!", book})
    }
  })
}


var getBook = function(req,res){
  book.findById(req.params.id,function(err,book){
    if(err){
      res.send(err);
    }
    else {
      res.json(book);
    }
  })
}

var deleteBook = function(req,res){
  book.remove({_id: req.params.id}, function(err,result){
    res.json({message: "Book Successfully deleted",result});
  })
}

var updateBook = function(req,res){
  book.findById({_id: req.params.id},function(err,book){
    if(err){
      res.send(err);
    }
    Object.assign(book,req.body).save(function(err,book){
      if(err) res.send(err);
      res.json({message: "Book updated!",book});
    })
  })
}

module.exports = {getBook, postbook, deleteBook, getBooks, updateBook};
