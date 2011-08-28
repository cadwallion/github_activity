var mongoose = require("mongoose");
var sys = require("sys");

var Filterset = new mongoose.Schema({
  name      : String,
  projects  : [String]
});
var User = new mongoose.Schema({
  githubId:  { type: Number, index: true },
  name    :  { type: String },
  login   :  { type: String, index: true },
  email   :  { type: String },
  filtersets: [Filterset]
 });

global.User = module.exports = mongoose.model('User', User);
