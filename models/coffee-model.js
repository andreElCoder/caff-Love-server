const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const CoffeeSchema = new Schema({
  name: String,
  description: String,
  url:String,
  rating: Number
});
const Coffee = mongoose.model('coffee', CoffeeSchema);

module.exports = Coffee;