const mongoose = require('mongoose');

const candidatSchema = mongoose.Schema({
  email: { type: String, required: true},
  fullname: { type: String, required: true},
  cin: { type: Number, required: true},
  age: { type: Number, required: true},
  postId: { type: mongoose.Schema.Types.ObjectId,ref: "Post" , required: true}
 /*  resumePath: { type: String, required: true} */
});

module.exports = mongoose.model('candidat',candidatSchema);