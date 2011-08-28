module.exports.loadRoutes = function (app) {
  //app.resource('users', Server.controllers.user);
  //app.get('/some/url', Server.controllers.resource.action);
  // alternatively, user auth middleware on a route
  //app.get('/another/url', authorizeRequired, Server.controllers.resource.action);

  /* 
     Middleware to enforce authorization. Example:
       app.get('/test/url', [authRequired], Server.controllers.test.url_action)
   */
  function authRequired(req, res, next) {
    if (req.loggedIn) {
      next();
    } else {
      res.redirect('/auth/github');
    }
  }

  function provides(type) {
    return function(req, res, next){
      if (req.accepts(type)) return next();
      next('route');
    }
  }
  
  app.post('/activities', Server.controllers.activities.index);
  app.post('/filtersets', Server.controllers.filtersets.create);

  app.resource(Server.controllers.index);
}
