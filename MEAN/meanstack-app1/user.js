var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var conn = mongoose.createConnection("mongodb://127.0.0.1/dbmsprojapp")

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
  },
  about_me:{
    type: String,
    required: true
  }
});

module.exports = conn.model('User',userSchema);
