var mongoose = require('mongoose');
mongoose.connext("mongodb://localhost/dbmsprojapp")

var userSchema = new mongoose.Schema({
  username:{
    type: String,
    unique: true,
    required : true,
  },
  password:{
    type: String,
    required: true
  },
  name:{
    type:String,
    required: true
  }
  about_me:{
    type: String,
    required: true
  }
});

var questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description:{
    type: String,
  },
  timeOfPost{
    type: Date,
    default: Date.now
  },
  author: {
    type:mongoose.Schema.Types.ObjectId
  }
});
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

exports.User = mongoose.model('User',userSchema);
exports.Question = mongoose.model('Question',questionSchema);
exports.Answer = mongoose.model('Answer',answerSchema);
