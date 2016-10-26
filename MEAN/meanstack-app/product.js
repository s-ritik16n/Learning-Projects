var mongoose = require('mongoose');

var productSchema = {
  name : {
    type: String,
    required : true
  },
  pictures : [{type: String,match:/^http:\/\//i}],
  price : {
    amount: {
      type : Number,
      required: true
    },
    currency : {
      type : String,
      enum: ['USD','EUR','GBP'],
      required : true
    }
  },
};

module.exports = new mongoose.Schema(productSchema);
module.exports.productSchema =productSchema;
