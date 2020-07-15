const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const markerSchema = new Schema({
  lat: Number,
  lng: Number
})
const CoffeeSchema = new Schema({
  name: String,
  description: String,
  url:String,
  rating: Number,
  markers:[markerSchema],
});
const Coffee = mongoose.model('coffee', CoffeeSchema);

module.exports = Coffee;