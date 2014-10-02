"use strict";
var $__0 = $traceurRuntime.initGeneratorFunction(openFile);
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__path__,
    $__co_45_fs__;
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__});
var fs = ($__co_45_fs__ = require("co-fs"), $__co_45_fs__ && $__co_45_fs__.__esModule && $__co_45_fs__ || {default: $__co_45_fs__});
function openFile(dir, fileName) {
  var filePath,
      $__1,
      $__2,
      $__3,
      $__4;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          filePath = path.join(dir, fileName);
          $ctx.state = 12;
          break;
        case 12:
          $__1 = fs.readFile;
          $__2 = $__1.call(fs, filePath, 'utf8');
          $ctx.state = 6;
          break;
        case 6:
          $ctx.state = 2;
          return $__2;
        case 2:
          $__3 = $ctx.sent;
          $ctx.state = 4;
          break;
        case 4:
          $__4 = {
            fileName: fileName,
            content: $__3
          };
          $ctx.state = 8;
          break;
        case 8:
          $ctx.returnValue = $__4;
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, $__0, this);
}
var $__default = openFile;
