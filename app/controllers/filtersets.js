module.exports = {
  create: function(req, res) {
    console.log(req.body.projects); 
    console.log(req.body.filter_name); 
  }
}
