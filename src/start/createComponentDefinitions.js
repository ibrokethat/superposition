import * as path from 'path';

import {find, map} from 'super-iter';

import getDocument from '../utils/getDocument';

export default function * initComponent (version, files, component_name) {

  //  get the document
  var doc = yield getDocument();

  //  grab the index file which is not only the template, but contains the config
  var component_index = find(files, file => file.fileName === 'index.html').content;

  var container = doc.createElement('div');
  container.innerHTML = component_index;
  container = container.firstChild;

  //  create the component
  var cmp = {
    name: component_name,
    template: component_index,
    model: null,
    controllers: null,
    path: null,
    request: null,
    renderer: null,
    has: {
      one: null,
      many: null
    },
    routes: null,
    pipeline: null
  };

  //  pull out the config
  var config = container.dataset.spCmpConfig;

  if (config) {

    config = JSON.parse(config);

    if (config.model) {

      cmp.model = path.relative(__dirname, 'src/' + version + '/models/' + config.model);
    }

    if (config.controllers) {

      cmp.controllers = config.controllers;
    }

    if (config.path) {

      cmp.path = config.path;

      if (!find(files, file => file.fileName === 'Request.js')) {
        throw new ReferenceError('Component (' + component_name + ') has a path but no Request.js');
      }

      cmp.request = path.relative(__dirname, 'src/' + version + '/components/Request');

    }

  }

  //  grab any files specified by convention
  if (find(files, file => file.fileName === 'renderer.js')) {

    cmp.renderer = path.relative(__dirname, 'src/' + version + '/components/renderer');
  }

  //  pull out any related components
  var has_one = container.querySelectorAll('[data-sp-has-one-cmp]');
  if (has_one.length) {
    cmp.has.one = map(has_one, node => node.dataset.spHasOneCmp);
  }

  var has_many = container.querySelectorAll('[data-sp-has-many-cmp]');
  if (has_many.length) {
    cmp.has.many = map(has_many, node => node.dataset.spHasManyCmp);
  }





  console.log(cmp);
  console.log('-------------------');

  return files;
}
