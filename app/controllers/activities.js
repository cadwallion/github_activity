module.exports = {
  index: function (req, res) {
    var Github = require('../models/github');

    console.log(req.session.auth.github.accessToken);
    Github.setAuthToken(req.session.auth.github.accessToken);
    Github.getCommitsByRepo("rails/rails", function(data) { 
      res.contentType('application/json');
      res.send(data);
    });
  }
}
