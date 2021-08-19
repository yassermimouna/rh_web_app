const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const candidatSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  fullname: { type: String, required: true},
  cin: { type: String, required: true},
  age: { type: String, required: true},
  resumePath: { type: String, required: true}
});

candidatSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Candidat',candidatSchema);