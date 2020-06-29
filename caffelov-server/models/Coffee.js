const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CoffeeSchema = new Schema({
  title: String,
  description: String,
  url:String,

});
const Coffee = mongoose.model('Coffee', CoffeeSchema);

module.exports = Coffee;