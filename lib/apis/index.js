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

var core = require('../core');

var promise = core.async.promise;
var partial = core.func.partial;
var map = core.iter.map;

var cmds = require('require-all')(path.resolve(__dirname, "../commands"));

//  create a dom object from which we'll create our templates and components
var container = cmds.getDocument();

//  generate the component apis and page routes
var componentDir = path.resolve(__dirname, '../../components');

var componentApi = map(fs.readdirSync(componentDir), function (fileName) {

  var componentType = cmds.initComponentType(container.createElement('div'), fs.readFileSync(path.resolve(__dirname, '../../components', fileName)));

  var componentPipeline = [
    partial(cmds.renderComponent, componentType),
    cmds.responseHTML
  ];

  //  generates the endpoint for the component
  var componentUri = cmds.generateUri(CONF.apis.base, CONF.apis.components, componentType.name, componentType.params);

  app.get(componentUri, partial(cmds.controller, [], componentPipeline));

  //  if this can can map to a URI endpoint, do so
  if (componentType.route) {

    var routePipeline = [
      partial(cmds.renderPage, 'body', componentType.route),
      cmds.responseHTML
    ];

    app.get(componentType.route, partial(cmds.controller, [], routePipeline));
  }


  return {

    uri: componentUri,
    componentType: componentType
  }

});

var apiPipeline = [
  function (io) {
    io.json = componentApi;
    return io;
  },
  cmds.responseJSON
];

app.get(CONF.apis.base + CONF.apis.components, partial(cmds.controller, [], apiPipeline));
