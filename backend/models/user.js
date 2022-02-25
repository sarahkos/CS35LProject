const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 15,
  },
  password:{
    type: String, 
    required: true,
  },
  bio: {
    type: String,
  },
  reipies: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  liked: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
});

moduel.exports = mongoose.model('User', user);