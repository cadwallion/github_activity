module.exports = {
  index: function (req, res) {
    var Github = require('../models/github');

    projects = JSON.parse(req.body.projects);
    Github.getCommitsByRepo(projects, function(data) { 
      res.contentType('application/json');
      res.send(data);
    });
  }
}
