"use strict";
var $__3 = $traceurRuntime.initGeneratorFunction(getComponentFiles);
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__path__,
    $__co_45_fs__,
    $__super_45_func__,
    $__super_45_iter__,
    $___46__46__47_utils_47_openFile__;
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__});
var fs = ($__co_45_fs__ = require("co-fs"), $__co_45_fs__ && $__co_45_fs__.__esModule && $__co_45_fs__ || {default: $__co_45_fs__});
var partial = ($__super_45_func__ = require("super-func"), $__super_45_func__ && $__super_45_func__.__esModule && $__super_45_func__ || {default: $__super_45_func__}).partial;
var map = ($__super_45_iter__ = require("super-iter"), $__super_45_iter__ && $__super_45_iter__.__esModule && $__super_45_iter__ || {default: $__super_45_iter__}).map;
var openFile = ($___46__46__47_utils_47_openFile__ = require("../utils/openFile"), $___46__46__47_utils_47_openFile__ && $___46__46__47_utils_47_openFile__.__esModule && $___46__46__47_utils_47_openFile__ || {default: $___46__46__47_utils_47_openFile__}).default;
function getComponentFiles(version, d, component) {
  var dir,
      fileNames,
      $__4,
      $__5,
      $__6;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          dir = path.resolve('src/', version, 'components', component);
          $ctx.state = 14;
          break;
        case 14:
          $ctx.state = 2;
          return fs.readdir(dir);
        case 2:
          fileNames = $ctx.sent;
          $ctx.state = 4;
          break;
        case 4:
          $__4 = partial(openFile, dir);
          $__5 = map(fileNames, $__4);
          $ctx.state = 10;
          break;
        case 10:
          $ctx.state = 6;
          return $__5;
        case 6:
          $__6 = $ctx.sent;
          $ctx.state = 8;
          break;
        case 8:
          $ctx.returnValue = $__6;
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, $__3, this);
}
var $__default = getComponentFiles;
