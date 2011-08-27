
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();
nko = require('nko')('GFFNV/wLZMvzznOi');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(express.compiler({ src: __dirname + '/public', enable: ['sass'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Octotracker'
  });
});

app.listen(process.env.NODE_ENV === 'production' ? 80 : 8000, function() {
    console.log('Agorassaur ready to total ownage and crushing business');

    // if run as root, downgrade to the owner of this file
    if (process.getuid() === 0) {
      require('fs').stat(__filename, function(err, stats) {
        if (err) return console.log(err)
        process.setuid(stats.uid);
      });
    }
});

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
