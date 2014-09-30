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


module.exports = function * superposition (conf, def) {

  var port = conf.port;
  var version = conf.version;

  var app = koa();
  var router = new Router();
  var component_router = new Router();

  //  grab the files from the file system we need to instantiate the pipelines
  //  used to build the components
  var index_file = (yield openFile(CONF.files.static, 'index.html')).content;
  var component_files = yield map(def.components, partial(getComponentFiles, version));

  //  instantiate components
  var components = map(component_files, initComponent);

  //  extract routes mapped to components
  var routes = map(ifilter(components, (cmp) => cmp.routes), initRoute);

  //  register components with the component router
  forEach(components, partial(registerComponent, component_router));

  //  register routes with the url router
  forEach(routes, partial(registerRoute, router));

  //  generate api definition for running app with server rendering
  var api_def_server = map(chain([components, routes]), generateServerApiDefinition);

  //  generate api definition for running app with client rendering
  var api_def_client = map(chain([components, routes]), generateClientApiDefinition);

  //  register our apis
  registerApi(server_api_router, api_def_server);
  registerApi(server_api_client, api_def_client);

  //  mount our endpoints
  app.use(mount('/', router.middleware()));
  app.use(mount('/components', component_router.middleware()))
  app.use(mount('/apis/server', server_api_router.middleware()));
  app.use(mount('/apis/client', client_api_router.middleware()));

  app.use(mount('/', health_router.middleware()));

  app.listen(port);

  // build frontend code bases
  buildServerFrontend();
  buildClientFrontend();


  console.log(component_files);

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
