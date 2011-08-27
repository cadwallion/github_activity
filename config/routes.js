module.exports.loadRoutes = function (app) {
  //app.resource('users', Server.controllers.user);

  app.resource(Server.controllers.test);
}
