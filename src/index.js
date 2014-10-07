import * as path from 'path';
import * as co from 'co';
import * as fs from 'co-fs';
import * as glob from 'co-glob';
import * as koa from 'koa';
import * as Router from 'koa-router';
import * as CONF from 'config';

import {partial} from 'super-func';
import {find, forEach, map, reduce} from 'super-iter';

import getComponentFiles from './start/getComponentFiles';
import createComponentDefinitions from './start/createComponentDefinitions';


export default function * superposition () {

  var app = koa();
  var router = new Router();
  var component_router = new Router();

  //  grab the files we need to create the component definitions
  var cmp_names = map(yield glob('lib/components/*'), dir_path => dir_path.split('/').pop());
  cmp_names = reduce(cmp_names, (acc, name) => {acc[name] = {}; return acc;}, {})
  var cmp_files = yield map(cmp_names, partial(getComponentFiles, 'lib/components'));
  //  create component definitions - used later to build the render pipelines and api definitions
  var cmp_definitions = yield map(cmp_files, createComponentDefinitions);

  // //  extract routes mapped to components
  // var routes = map(ifilter(components, (cmp) => cmp.routes), initRoute);

  // //  register components with the component router
  // forEach(components, partial(registerComponent, component_router));

  // //  register routes with the url router
  // forEach(routes, partial(registerRoute, router));

  // //  generate api definition for running app with server rendering
  // var api_def_server = map(chain([components, routes]), generateServerApiDefinition);

  // //  generate api definition for running app with client rendering
  // var api_def_client = map(chain([components, routes]), generateClientApiDefinition);

  // //  register our apis
  // registerApi(server_api_router, api_def_server);
  // registerApi(server_api_client, api_def_client);

  // //  mount our endpoints
  // app.use(mount('/', router.middleware()));
  // app.use(mount('/components', component_router.middleware()))
  // app.use(mount('/apis/server', server_api_router.middleware()));
  // app.use(mount('/apis/client', client_api_router.middleware()));

  // app.use(mount('/', health_router.middleware()));

  // app.listen(port);

  // // build frontend code bases
  // buildServerFrontend();
  // buildClientFrontend();


}
