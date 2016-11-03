var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var conn = mongoose.createConnection("mongodb://127.0.0.1/dbmsprojapp")

var answerSchema = new mongoose.Schema({

  text:{
    type:String,
    required: true
  },
  upvotes:Number,
  downvotes: Number,
  author:{
    type:mongoose.Schema.Types.ObjectId,
  },
  question:{
    type:mongoose.Schema.Types.ObjectId,
    required: true
  },
  comments:[{
    text:{
      type:String,
      required: true
    },
    author:{
      type:mongoose.Schema.Types.ObjectId
    },
    time:Date
  }]
});



module.exports = conn.model('Answer',answerSchema);
