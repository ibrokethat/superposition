var koa = require('koa');
var Router = require('koa-router');

var CONF = require('config');
var iter = require('super-iter');
var forEach = iter.forEach;


module.exports = function superposition (src) {


  forEach(src, initApps);

}


function initApps(def, version) {

  var port = CONF.app[version].port;
  var release = CONF.app[version].release;

  var app = koa();
  var urlRoutes = new Router();
  var componentRoutes = new Router();

  forEach(def.components, function (component) {
    console.log(component);
  });



  app.use(mount('/', urlRoutes.middleware()));
  app.use(mount('/components', componentRoutes.middleware()));

  app.listen(port);

}
