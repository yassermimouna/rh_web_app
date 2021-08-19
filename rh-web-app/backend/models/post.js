const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  jobtitle:{ type : String, required: true},
  description:{ type : String , required: true},
  skills: {type : String , required: true},
  exp: {type : String , required: true},
  creator: { type: mongoose.Schema.Types.ObjectId,ref: "User" , required: true}
});

module.exports = mongoose.model('Post',postSchema);