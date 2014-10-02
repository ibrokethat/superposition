"use strict";
var $__2 = $traceurRuntime.initGeneratorFunction(initComponent);
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__object_45_assign__,
    $__super_45_iter__,
    $___46__46__47_utils_47_getDocument__;
var assign = ($__object_45_assign__ = require("object-assign"), $__object_45_assign__ && $__object_45_assign__.__esModule && $__object_45_assign__ || {default: $__object_45_assign__});
var find = ($__super_45_iter__ = require("super-iter"), $__super_45_iter__ && $__super_45_iter__.__esModule && $__super_45_iter__ || {default: $__super_45_iter__}).find;
var getDocument = ($___46__46__47_utils_47_getDocument__ = require("../utils/getDocument"), $___46__46__47_utils_47_getDocument__ && $___46__46__47_utils_47_getDocument__.__esModule && $___46__46__47_utils_47_getDocument__ || {default: $___46__46__47_utils_47_getDocument__}).default;
function initComponent(files, component_name) {
  var doc,
      component_index,
      container,
      cmp,
      config;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          $ctx.state = 2;
          return getDocument();
        case 2:
          doc = $ctx.sent;
          $ctx.state = 4;
          break;
        case 4:
          component_index = find(files, (function(file) {
            return file.fileName === 'index.html';
          })).content;
          container = doc.createElement('div');
          container.innerHTML = component_index;
          cmp = {
            name: component_name,
            template: component_index
          };
          config = container.firstChild.dataset.spCmpConfig;
          if (config) {
            config = JSON.parse(config);
            assign(cmp, config);
          }
          console.log(cmp);
          console.log('-------------------');
          $ctx.state = 8;
          break;
        case 8:
          $ctx.returnValue = files;
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, $__2, this);
}
var $__default = initComponent;
