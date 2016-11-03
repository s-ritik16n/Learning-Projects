var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var conn = mongoose.createConnection("mongodb://127.0.0.1/dbmsprojapp")

var questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description:{
    type: String,
  },
  timeOfPost:{
    type: Date,
    default: Date.now
  },
  author: {
    type:mongoose.Schema.Types.ObjectId
  }
});

module.exports = conn.model('Question',questionSchema);
