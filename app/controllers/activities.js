module.exports = {
  index: function (req, res) {
    var Github = require('../models/github');

    filters = JSON.parse(req.body.projects);
    Github.getCommitsByRepo(filters, function(data) { 
      console.log(data);

      var projects = []
      // Parse the commit data into a format for views
      for (key in data) {
        var project = new Object();
        project.owner = key.split('/')[0];
        project.name = key.split('/')[1];
        project.activities = [];
        for (commit in data[key]) {
          console.log(commit);
          var activity = new Object();
          activity.author = data[key][commit].author;
          console.log(activity.author);

          project.activities.push(activity);
        }
        projects.push(project);
      };

      console.log(projects);
      res.render('activities/results.jade', {
        layout: false,
        projects: projects
      });
    });
  }
}
