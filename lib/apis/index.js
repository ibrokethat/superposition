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
var jsdom = require('jsdom');

var core = require('../core');

var promise = core.async.promise;
var partial = core.func.partial;
var forEach = core.iter.forEach;

var cmds = require('require-all')(path.resolve(__dirname, "../commands"));

//  create a dom object from which we'll create our templates and components
var document = jsdom('<html><head></head><body></body></html>') ;

//  generate the component apis and page routes
var componentDir = path.resolve(__dirname, '../../components');

forEach(fs.readdirSync(componentDir), function (fileName) {

  var componentType = cmd.initComponenType(document.body, fs.readfileSync(fileName));


  var componentPipeline = [
    partial(cmds.render, componentType),
    cmds.response
  ];

  //  generates the endpoint for the component
  var componentUri = cmds.generateUri(CONF.apis.base, CONF.apis.components, componentType.name, componentType.params);

  //  generates the endpoint for the component
  app.get(componentUri, partial(cmds.controller, [], componentPipeline));

  //  if this can can map to a URI endpoint, do so
  if (componentType.route) {

    var index = jsdom(fs.readfileSync(CONF.files.index));

    var routePipeline = [
      partial(cmds.renderPage, index, 'body', componentType.route),
      cmds.response
    ];

    app.get(route, partial(cmds.controller, [], routePipeline));

  }


});
