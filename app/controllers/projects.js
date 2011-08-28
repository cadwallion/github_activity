module.exports = {
  filters: function(req, res) {
    var Github = require('../models/github');

    Github.setAuthToken(req.session.auth.github.accessToken);
    Github.getWatchedRepos(function(repos) {
      var projects = [];
      json = JSON.parse(repos);
      for (key in json) {
        var slug = json[key].owner.login + "/" + json[key].name;
        projects.push(slug);
      }
      res.contentType("application/json");
      res.send(projects);
    });
  },
  index: function(req, res) {
    var Github = require('../models/github');

    Github.setAuthToken(req.session.auth.github.accessToken);
    Github.getFollowing(function(repos) {
      console.log(repos);
      Github.getCommitsByRepo(repos, function(data) {      
        var projects = []
        // Parse the commit data into a format for views
        for (key in data) {
          var project = new Object();
          project.owner = key.split('/')[0];
          project.name = key.split('/')[1];
          project.commits = data[key];
          projects.push(project);
        };

        console.log(projects);
        res.render('activities/results.jade', {
          layout: false,
          projects: projects
        });
      });
    });
  }
}
