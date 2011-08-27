
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();
var nko = require('nko')('GFFNV/wLZMvzznOi');


// APP.JS
var Server = {},
    express = require('express'),
    path = require('path'),
    sys = require('sys'),
    application_root = __dirname;

global.Server = Server;
Server.root = application_root;
global.app = express.createServer();

Server.setup = require('./config/setup').setup({
  app: app,
  port: (process.env.NODE_ENV === 'production' ? 80 : 8000),
  mongoose: require('mongoose'),
  db_url:  'mongodb://nodeapp:ag0rassaur@staff.mongohq.com:10021/nko2_agorasaurus',
  express: express,
  resource: require('express-resource'),
  oauth: {
    consumerKey: "1e0284b9d4f4f9a45a54",
    consumerSecret: "e48a030e7dd19f989bac35e03778bd4afebd6753"
  },
  paths: {
    views : path.join(application_root, "app", "views"),
    root : path.join(application_root, "public"),
    controllers : path.join(application_root, "app", "controllers"),
    models : path.join(application_root, "app", "models")
  }
});
