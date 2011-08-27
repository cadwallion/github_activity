module.exports.setup = function(o) {
  var sys = require('sys'),
      fs = require('fs'),
      app = o.app, 
      mongoose = o.mongoose,
      resource = o.resource,
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

  require('./routes').loadRoutes(app);

  app.configure(function() { 
    app.set('view engine', 'jade');
    app.set('views', o.paths.views);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'omgsekretag0rapass' }));
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

  app.listen(o.port || 3000);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}
