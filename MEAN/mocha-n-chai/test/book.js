//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var book = require('../controllers/models/book');

//dev dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

  // parent block
describe('Books', function() {
  beforeEach(function(done) {
      book.remove({}, function(err) {
         done();
      });
  })

  describe('/GET book',function(){
      it('it should GET all the books',function(done){
        chai.request(server)
        .get('/book')
        .end((err,res)=>{
          res.should.have.status(200);
          res.should.be.a('Object');
          res.body.length.should.be.eql(0);
          done();
        })
      })
    })

  describe('/POST book',function(){
    it('it should not post a book without pages field',function(done){
      let newbook = {
        title: "THE DA VINCI CODE",
        author: "DAN BROWN",
        year : 1980
      }
      chai.request(server)
      .post('/book')
      .send(book)
      .end(function(req,res){
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('pages');
        res.body.errors.pages.should.have.property('kind').eql('required');
        done();
      })
    })
    it('it should post a book',function(done){
      let newbook = {
        title: "THE DA VINCI CODE",
        author: "DAN BROWN",
        pages:400,
        year : 1980
      }
      chai.request(server)
      .post('/book')
      .send(newbook)
      .end(function(req,res){
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('Successful insertion!');
        res.body.book.should.have.property('title');
        res.body.book.should.have.property('author');
        res.body.book.should.have.property('pages');
        res.body.book.should.have.property('year');
        done();
      })
    })
  })

  describe('/GET/:id book',function(){
    it('it should get the book with the given id',function(done){
      let newbook = new book({
        title: "THE DA VINCI CODE",
        author: "DAN BROWN",
        pages: 400,
        year : 1980
      })
      newbook.save(function(err,book){
        chai.request(server)
        .get('/book/'+book.id)
        .end(function(req,res){
          res.should.have.status(200);
          res.body.should.be.a('Object');
          res.body.should.have.property('title');
          res.body.should.have.property('author');
          res.body.should.have.property('pages');
          res.body.should.have.property('year');
          res.body.should.have.property('_id').eql(book.id);
          done();
        })
      })
      chai.request(server)

    })
  })

  describe('/PUT/:id book',function(){
    it('it should update the book with the given id',function(done){
      let newbook = new book({
        title: "THE DA VINCI CODE",
        author: "DAN BROWN",
        pages: 400,
        year : 1980
      })
      newbook.save(function(err,book){
        chai.request(server)
        .put('/book/'+book.id)
        .send({title: "THE DA VINCI CODE", author:"DAN BROWN", pages: 410, year : 1990})
        .end(function(req,res){
          res.should.have.status(200);
          res.body.should.be.a('Object');
          res.body.should.have.property('message').eql('Book updated!');
          res.body.book.should.have.property('pages').eql(410);
          done();
        })
      })
    })
  })
})
