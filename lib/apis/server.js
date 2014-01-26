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

var async = require('super-async');
var func = require('super-func');
var iter = require('super-iter');

var promise = async.promise;
var partial = func.partial;
var map = iter.map;
var forEach = iter.forEach;

var cmds = require('require-all')(path.resolve(__dirname, "../commands"));

//  create a dom object from which we'll create our templates and components
var container = cmds.getDocument();

//  generate the component apis and page routes from the host
var componentDir = path.join(process.cwd(), '/components');

var componentApi = map(fs.readdirSync(componentDir), function (fileName) {

  var componentType = cmds.initComponentType(
    container.createElement('div'),
    fs.readFileSync(path.join(componentDir, fileName), 'utf8')
  );

  var componentPipeline = [
    partial(cmds.renderComponent, componentType),
    cmds.responseHTML
  ];

  //  generates the endpoint for the component
  var componentUri = cmds.generateUri(
    CONF.apis.base,
    CONF.apis.components,
    componentType.name,
    componentType.params
  );

  //  create the component route
  app.get(componentUri, partial(cmds.controller, [], componentPipeline));

  //  if this component contains routes that map to a URI endpoint, do so
  if (componentType.routes.length) {

    forEach(componentType.routes, function (route) {

      var routePipeline = [
        partial(cmds.renderPage, route.path),
        cmds.responseHTML
      ];

      app.get(route.path, partial(cmds.controller, [], routePipeline));

      if (route.defaultPath) {
        app.get(route.defaultPath, partial(cmds.controller, [], routePipeline));
      }

    });

  }

  componentType.uri = componentUri;

  return componentType;

});

var apiPipeline = [
  function (io) {
    io.json = componentApi;
    return io;
  },
  cmds.responseJSON
];

app.get(CONF.apis.base, partial(cmds.controller, [], apiPipeline));
