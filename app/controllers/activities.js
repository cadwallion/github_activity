module.exports = {
  index: function (req, res) {
    var Github = require('../models/github');

    res.expose(res.user, 'express.user');
    res.expose(req.loggedIn, 'express.loggedIn');
    projects = JSON.parse(req.body.projects);
    Github.getCommitsByRepo(projects, function(data) { 
      res.contentType('application/json');
      res.send(data);
    });
  }
}
