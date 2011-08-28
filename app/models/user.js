var mongoose = require("mongoose");
var sys = require("sys");

var User = new mongoose.Schema({
  githubId:  { type: Number, index: true },
  name    :  { type: String },
  login   :  { type: String, index: true },
  email   :  { type: String }
 });

global.User = module.exports = mongoose.model('User', User);
