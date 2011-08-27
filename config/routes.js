module.exports.loadRoutes = function (app) {
  //app.resource('users', Server.controllers.user);

  app.resource(Server.controllers.test);

  var oauthResp = app.resource("oauth", Server.controllers.oauth);
  oauthResp.map('get', '/callback', Server.controllers.oauth.callback);
  oauthResp.map('get', '/connect', Server.controllers.oauth.connect);

}
