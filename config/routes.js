module.exports.loadRoutes = function (app) {
  //app.resource('users', Server.controllers.user);
  //app.get('/some/url', Server.controllers.resource.action);

  app.resource(Server.controllers.index);
}
