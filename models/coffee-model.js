const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const locationSchema = new Schema({
  lat: Number,
  lng: Number
})
const CoffeeSchema = new Schema({
  name: String,
  description: String,
  url:String,
  rating: Number,
  locations:[locationSchema]
});
const Coffee = mongoose.model('coffee', CoffeeSchema);

module.exports = Coffee;