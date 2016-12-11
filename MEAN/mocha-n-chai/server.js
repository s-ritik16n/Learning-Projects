let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8000;
let book = require('./controllers/routes/book');
let config = require('config');

//db options
let options = {
  server:{socketOptions : {keepAlive:1,connectTimeoutMS:30000}},
  replset:{ socketOptions: {keepAlive:1, connectTimeoutMS:30000}}
};

//db connection
mongoose.connect(config.DBHost,options);
let db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));

//don't show the log when it it test
if(config.util.getEnv('NODE_ENV') !== 'test'){
  app.use(morgan('combined'));
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

app.get('/',function(req,res){
  res.json({message:"Welcome to Bookstore!"});
});

app.route('/book')
.get(book.getBooks)
.post(book.postbook);
app.route('/book/:id')
.get(book.getBook)
.delete(book.deleteBook)
.put(book.updateBook);

app.listen(port);
console.log("All eyes at "+port);

module.exports = app;
