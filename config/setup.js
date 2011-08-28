module.exports.setup = function(o) {
  var sys = require('sys'),
      fs = require('fs'),
      app = o.app, 
      mongoose = o.mongoose,
      resource = o.resource,
      everyauth = require('everyauth'),
      express = o.express;



  Server.paths = o.paths;
  global.db = mongoose.connect(o.db_url);


  Server.controllers = {};
  Server.models = {};

  files = fs.readdirSync(o.paths.controllers);
  files.forEach(function(file) {
    resource = require(o.paths.controllers + "/" + file);
    name = file.replace('.js', '')
    Server.controllers[name] = resource;
  });

  files = fs.readdirSync(o.paths.models);
  files.forEach(function(file) {
    resource = require(o.paths.models + "/" + file);
    name = file.replace('.js', '')
    Server.models[name] = resource;
  });

  everyauth.github
  .appId(o.oauth.consumerKey)
  .appSecret(o.oauth.consumerSecret)
  .findOrCreateUser(function (session, accessToken, accessTokenExtra, githubUserMetadata) {
    // create user logic here
    console.log(githubUserData);
  })
  .redirectPath('/');
 

  require('./routes').loadRoutes(app);

 
  app.configure(function() { 
    app.set('view engine', 'jade');
    app.set('views', o.paths.views);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'omgsekretag0rapass' }));
    app.use(everyauth.middleware());
    app.use(express.compiler({ src: o.paths.root, enable: ['sass'] }));
    app.use(app.router);
    app.use(express.static(o.paths.root));
  });

  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  });

  app.configure('production', function(){
    app.use(express.errorHandler()); 
  });

  app.listen(o.port, function() {
    console.log('Agorassaur ready to total ownage and crushing business');

    // if run as root, downgrade to the owner of this file
    if (process.getuid() === 0) {
      require('fs').stat(__dirname + "../app.js", function(err, stats) {
        if (err) return console.log(err)
        process.setuid(stats.uid);
      });
    }
  });
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}
