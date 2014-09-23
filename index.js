var path = require('path');
var fs = require('co-fs');
var co = require('co');
var parallel = require('co-parallel');

var koa = require('koa');
var Router = require('koa-router');

var func = require('super-func');
var partial = func.partial;
var iter = require('super-iter');
var forEach = iter.forEach;
var map = iter.map;

var CONF = require('config');

module.exports = function * superposition (src) {

  forEach(src, initApps);
}

function * openFile (dir, fileName) {

  var filePath = path.resolve(dir, fileName);

  return {
    fileName: fileName,
    file: yield fs.readFile(filePath, 'utf8')
  };
}


function initApps (def, version) {

  var port = CONF.app[version].port;
  var release = CONF.app[version].release;

  var app = koa();
  var urlRoutes = new Router();
  var componentRoutes = new Router();

  forEach(def.components, function (dir, component) {

    co(function * () {

      var dir = path.resolve('src/', version, 'components', component);

      var fileNames = yield fs.readdir(dir);
      var files = yield map(fileNames, partial(openFile, dir));
      console.log(files);
    })();
  });

  // app.use(mount('/', urlRoutes.middleware()));
  // app.use(mount('/components', componentRoutes.middleware()));

  app.listen(port);
}
