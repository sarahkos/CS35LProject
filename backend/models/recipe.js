const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipe = new mongoose.Schema({
  Author: { 
    type: Schema.ObjectId,
    ref: 'User',
  },
  text: String,
  likes: Number,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  published: Boolean,
  image:
  {
    name: String,
    desc: String,
    img:
    {
      data: ArrayBuffer,
      contentType: String
    }
  }
});

moduel.exports = mongoose.model('Recipe', recipe);