var mongoose = require('mongoose');

var cateogryschema = {
  _id: {type: String},
  parent:{
    type: String,
    ref: 'Category'
  },
  ancestors:[{
    type: String,
    ref: 'Category'
  }]
}

modules.exports = new mongoose.Schema(categoryschema);
module.exports.categorySchema = categorySchema;
