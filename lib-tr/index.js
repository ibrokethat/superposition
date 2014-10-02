"use strict";
var $__4 = $traceurRuntime.initGeneratorFunction(superposition);
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__path__,
    $__co_45_fs__,
    $__co__,
    $__koa__,
    $__koa_45_router__,
    $__config__,
    $__super_45_func__,
    $__super_45_iter__,
    $__start_47_getComponentFiles__,
    $__start_47_initComponent__;
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__});
var fs = ($__co_45_fs__ = require("co-fs"), $__co_45_fs__ && $__co_45_fs__.__esModule && $__co_45_fs__ || {default: $__co_45_fs__});
var co = ($__co__ = require("co"), $__co__ && $__co__.__esModule && $__co__ || {default: $__co__});
var koa = ($__koa__ = require("koa"), $__koa__ && $__koa__.__esModule && $__koa__ || {default: $__koa__});
var Router = ($__koa_45_router__ = require("koa-router"), $__koa_45_router__ && $__koa_45_router__.__esModule && $__koa_45_router__ || {default: $__koa_45_router__});
var CONF = ($__config__ = require("config"), $__config__ && $__config__.__esModule && $__config__ || {default: $__config__});
var partial = ($__super_45_func__ = require("super-func"), $__super_45_func__ && $__super_45_func__.__esModule && $__super_45_func__ || {default: $__super_45_func__}).partial;
var $__1 = ($__super_45_iter__ = require("super-iter"), $__super_45_iter__ && $__super_45_iter__.__esModule && $__super_45_iter__ || {default: $__super_45_iter__}),
    find = $__1.find,
    forEach = $__1.forEach,
    map = $__1.map,
    reduce = $__1.reduce;
var getComponentFiles = ($__start_47_getComponentFiles__ = require("./start/getComponentFiles"), $__start_47_getComponentFiles__ && $__start_47_getComponentFiles__.__esModule && $__start_47_getComponentFiles__ || {default: $__start_47_getComponentFiles__}).default;
var initComponent = ($__start_47_initComponent__ = require("./start/initComponent"), $__start_47_initComponent__ && $__start_47_initComponent__.__esModule && $__start_47_initComponent__ || {default: $__start_47_initComponent__}).default;
function superposition(conf, def) {
  var port,
      version,
      app,
      router,
      component_router,
      component_files,
      components;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          port = conf.port;
          version = conf.version;
          app = koa();
          router = new Router();
          component_router = new Router();
          $ctx.state = 10;
          break;
        case 10:
          $ctx.state = 2;
          return map(def.components, partial(getComponentFiles, version));
        case 2:
          component_files = $ctx.sent;
          $ctx.state = 4;
          break;
        case 4:
          $ctx.state = 6;
          return map(component_files, initComponent);
        case 6:
          components = $ctx.sent;
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, $__4, this);
}
var $__default = superposition;
