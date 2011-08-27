module.exports.loadRoutes = function (app) {
  //app.resource('users', Server.controllers.user);

  app.resource(Server.controllers.test);

  app.get('/oauth/callback', Server.controllers.oauth.callback);
  app.get('/oauth/connect', Server.contollers.oauth.connect);

}
