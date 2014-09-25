var path = require('path');
var fs = require('co-fs');
var co = require('co');
var parallel = require('co-parallel');

var koa = require('koa');
var Router = require('koa-router');

var func = require('super-func');
var partial = func.partial;
var iter = require('super-iter');
var find = iter.find;
var forEach = iter.forEach;
var map = iter.map;
var reduce = iter.reduce;

var jsdom = require('jsdom').jsdom;

var CONF = require('config');


module.exports = function * superposition (app, def) {

  var port = app.port;
  var version = app.version;

  var indexFile = (yield openFile(process.cwd(), CONF.files.index)).content;
  var componentFiles = yield map(def.components, partial(getComponentFiles, version));
  // var componentIndex = find(files, function (file) {
  //   return file.fileName === 'index.html';
  // });

  // var components = map(componentFiles, )
  // var doc = getDocument();
  // var container = doc.createElement('div');
  // container.innerHTML = componentIndex.content;
  // container = container.firstChild;

  // console.log(container.dataset.spCmp);


  console.log(componentFiles);

}

//  create a fake dom object
function getDocument() {

  return jsdom(indexFile);

}


function * openFile (dir, fileName) {

  var filePath = path.join(dir, fileName);

  return {
    fileName: fileName,
    content: yield fs.readFile(filePath, 'utf8')
  };
}


function * getComponentFiles (version, d, component) {

  var dir = path.resolve('src/', version, 'components', component);
  var fileNames = yield fs.readdir(dir);
  return yield map(fileNames, partial(openFile, dir));
}


// function initApps (def, version) {


//   var app = koa();
//   var urlRoutes = new Router();
//   var componentRoutes = new Router();

//   var doc = getDocument();

//   forEach(def.components, function (dir, component) {

//     var dir = path.resolve('src/', version, 'components', component);

//     var fileNames = fs.readdirSync(dir);
//     var files = map(fileNames, partial(openFile, dir));

//     var componentIndex = find(files, function (file) {
//       return file.fileName === 'index.html';
//     });


//     var container = doc.createElement('div');
//     container.innerHTML = componentIndex.content;
//     container = container.firstChild;

//     console.log(container.dataset.spCmp);
//   });

//   // app.use(mount('/', urlRoutes.middleware()));
//   // app.use(mount('/components', componentRoutes.middleware()));

//   app.listen(port);
// }
