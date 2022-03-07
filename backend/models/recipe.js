const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipe = new mongoose.Schema({
  author: { 
    type: Schema.ObjectId,
    ref: 'User',
  },
  title: { type: String, required: true },
  text: { type: String, required: true },
  ingredients: [String],
  liked: [{ type: Schema.ObjectId, ref: 'User' }],
  comments: [{
    author: { type: Schema.ObjectId, ref: 'User' },
    text: { type: String, required: true }, 
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  date: { type: Date, default: Date.now },
});

recipe.virtual('likes').get(function() {
  return this.liked.length;
});

recipe.set("toJSON", {
  virtuals: true,
});

recipe.index({ title: "text", text: "text" });

module.exports = mongoose.model('Recipe', recipe);