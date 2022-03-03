const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipe = new mongoose.Schema({
  author: { 
    type: Schema.ObjectId,
    ref: 'User',
  },
  text: String,
  likes: Number,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recipe', recipe);