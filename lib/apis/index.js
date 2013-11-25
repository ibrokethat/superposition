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
var log = require('metalogger')();
var CONF = require('config');
var jsdom = require('jsdom');
var core = require('core');

var promise = core.async.promise;
var partial = core.func.partial;
var forEach = core.iter.forEach;


//  create a dom object in which we'll create our templates and components
var document = jsdom("<html><head></head><body></body></html>") ;

//  generate the component apis and page routes
var componentDir = path.resolve(__dirname, "../../components");

forEach(fs.readdirSync(componentDir), function (fileName) {

  document.body.innerHTML = fs.readfileSync(fileName);

  var componentType = document.querySelector('[data-sp-component-type]');
  var params = componentType.dataset.spParams || "";

  var componentPipeline = [
    partial(cmds.render, componentType)
  ];

  //  generates the endpoint for the component
  var componentUri = cmds.generateUri(CONF.apis.base, CONF.apis.components, fileName, params);

  //  generates the endpoint for the component
  app.get(componentUri, partial(cmds.serverController, componentPipeline));

  //  if this can can map to a URI endpoint, do so
  var route = componentType.dataset.spRoute;
  if (route) {

    var routePipeline = [
      partial(cmds.render, componentType),
      partial(cmds.renderPage, CONF.files.index)
    ];

    app.get(route, partial(cmds.serverController, routePipeline));

  }


});
