module.exports.loadRoutes = function (app) {
  //app.resource('users', Server.controllers.user);
  //app.get('/some/url', Server.controllers.resource.action);
  // alternatively, user auth middleware on a route
  //app.get('/another/url', authorizeRequired, Server.controllers.resource.action);

  app.resource(Server.controllers.index);
}
