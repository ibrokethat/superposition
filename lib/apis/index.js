'use strict';
/**
 *  @description  dynamically creates API endpoints
 *  @author       si@ibrokethat.com
 *
 */
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = exports = module.exports = express();
// var log = require('metalogger')();
var CONF = require('config');
var jsdom = require('jsdom').jsdom;

var core = require('../core');

var promise = core.async.promise;
var partial = core.func.partial;
var forEach = core.iter.forEach;

var cmds = require('require-all')(path.resolve(__dirname, "../commands"));

//  create a dom object from which we'll create our templates and components
var index = fs.readFileSync(path.resolve(__dirname, '../../layouts/', CONF.files.index), {encoding:'utf8'});
var document = jsdom(index);

//  generate the component apis and page routes
var componentDir = path.resolve(__dirname, '../../components');

forEach(fs.readdirSync(componentDir), function (fileName) {

  var componentType = cmds.initComponentType(document.createElement('div'), fs.readFileSync(path.resolve(__dirname, '../../components', fileName)));

  var componentPipeline = [
    partial(cmds.renderComponent, index, componentType),
    cmds.response
  ];

  //  generates the endpoint for the component
  var componentUri = cmds.generateUri(CONF.apis.base, CONF.apis.components, componentType.name, componentType.params);

  app.get(componentUri, partial(cmds.controller, [], componentPipeline));

  //  if this can can map to a URI endpoint, do so
  if (componentType.route) {

    var routePipeline = [
      partial(cmds.renderPage, index, 'body', componentType.route),
      cmds.response
    ];

    app.get(componentType.route, partial(cmds.controller, [], routePipeline));

  }


});
