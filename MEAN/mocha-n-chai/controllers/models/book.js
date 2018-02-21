var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let bookSchema = new Schema(
  {
    title: {type: String, required:true},
    author: {type:String, required: true},
    year: {type: Number, required: true},
    pages: {type: Number, required: true, min: 1},
    createdAt: {type: Date, required: true, default: Date.now },
  },
  {
    versionKey: false
  }
);

bookSchema.pre('save',next => {
  now = new Date();
  if(!this.createdAt){
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('book',bookSchema);
