module.exports = {
  create: function(req, res) {
    req.user.filtersets.push({name: req.body.filter_name, projects: req.body.projects});
    req.user.save(function(err) { 
      if (!err) { 
        res.send(200);
      } else {
        res.send(400);
      }
    });
  },
  destroy: function(req, res) {
    req.user.filtersets.forEach(function(f) { 
      if (f.name == req.params.name) {
        f.remove();
        req.user.save(function(err) { 
          if (!err) { 
            res.send(200);
          } else  {
            res.send(400);
          }
        });
      }
    });
  }
}
