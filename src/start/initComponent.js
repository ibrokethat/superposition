import * as path from 'path';

import {find} from 'super-iter';

import getDocument from '../utils/getDocument';

import * as System from '../utils/moduleSystem';

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
      cmp.model = yield System.import(path.relative(__dirname, 'src/' + version + '/models/' + config.model));
      // cmp.model = require(path.relative(__dirname, 'src/' + version + '/models/' + config.model));
    }

    if (config.controllers) {
      cmp.controllers = config.controllers;
    }

    if (config.path) {
      cmp.path = config.path;
      cmp.request = yield System.import(path.relative(__dirname, 'src/' + version + '/components/Request'));
      // cmp.request = require(path.relative(__dirname, 'src/' + version + '/components/Reqest'));
    }

  }

  //  grab any files specified by convention
  var renderer = find(files, file => file.fileName === 'renderer.js');

  if (renderer) {
    cmp.renderer = yield System.import(path.relative(__dirname, 'src/' + version + '/components/renderer'));
    // cmp.renderer = require(path.relative(__dirname, 'src/' + version + '/components/renderer'));
  }

  console.log(cmp);

  var has_one = container.querySelectorAll('data-sp-has-one-cmp');
  var has_many = container.querySelectorAll('data-sp-has-many-cmp');
  //  pull out any related components



  console.log('-------------------');

  return files;
}
