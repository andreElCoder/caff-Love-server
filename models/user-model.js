const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  n_followers:Number,
  coffees : [{
    type:Schema.Types.ObjectId,
    ref:'Coffee'
  }],
}, 
{
  timestamps: true
});

const User = mongoose.model('Users', userSchema);

module.exports = User;