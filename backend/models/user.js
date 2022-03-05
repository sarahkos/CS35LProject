const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 15,
    lowercase: true,
  },
  password:{
    type: String, 
    required: true,
    select: false,
  },
  bio: {
    type: String,
    default: "",
  },
  recipies: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  liked: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
});

user.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('User', user);