module.exports = {
  index: function (req, res) {
    var Github = require('../models/github');

    projects = JSON.parse(req.body.projects);
    Github.getCommitsByRepo(projects, function(data) { 
      console.log(data);
      res.render('activities/results.jade', {
          layout: false,
          data: data
      });
    });
  }
}
